#!/usr/bin/env python

from __future__ import absolute_import, print_function

import time
import unittest

import mock
import pykka

import arvnodeman.daemon as nmdaemon
from arvnodeman.computenode.dispatch import ComputeNodeMonitorActor
from . import testutil

class NodeManagerDaemonActorTestCase(testutil.ActorTestMixin,
                                     unittest.TestCase):
    def new_setup_proxy(self):
        # Make sure that every time the daemon starts a setup actor,
        # it gets a new mock object back.
        self.last_setup = mock.MagicMock(name='setup_proxy_mock')
        return self.last_setup

    def make_daemon(self, cloud_nodes=[], arvados_nodes=[], want_sizes=[],
                    min_size=testutil.MockSize(1), min_nodes=0, max_nodes=8):
        for name in ['cloud_nodes', 'arvados_nodes', 'server_wishlist']:
            setattr(self, name + '_poller', mock.MagicMock(name=name + '_mock'))
        self.arv_factory = mock.MagicMock(name='arvados_mock')
        self.cloud_factory = mock.MagicMock(name='cloud_mock')
        self.cloud_factory().node_start_time.return_value = time.time()
        self.cloud_updates = mock.MagicMock(name='updates_mock')
        self.timer = testutil.MockTimer(deliver_immediately=False)
        self.node_setup = mock.MagicMock(name='setup_mock')
        self.node_setup.start().proxy.side_effect = self.new_setup_proxy
        self.node_setup.reset_mock()
        self.node_shutdown = mock.MagicMock(name='shutdown_mock')
        self.daemon = nmdaemon.NodeManagerDaemonActor.start(
            self.server_wishlist_poller, self.arvados_nodes_poller,
            self.cloud_nodes_poller, self.cloud_updates, self.timer,
            self.arv_factory, self.cloud_factory,
            [54, 5, 1], min_size, min_nodes, max_nodes, 600, 1800, 3600,
            self.node_setup, self.node_shutdown).proxy()
        if cloud_nodes is not None:
            self.daemon.update_cloud_nodes(cloud_nodes).get(self.TIMEOUT)
        if arvados_nodes is not None:
            self.daemon.update_arvados_nodes(arvados_nodes).get(self.TIMEOUT)
        if want_sizes is not None:
            self.daemon.update_server_wishlist(want_sizes).get(self.TIMEOUT)

    def monitor_list(self):
        return pykka.ActorRegistry.get_by_class(ComputeNodeMonitorActor)

    def monitored_arvados_nodes(self):
        pairings = []
        for future in [actor.proxy().arvados_node
                       for actor in self.monitor_list()]:
            try:
                pairings.append(future.get(self.TIMEOUT))
            except pykka.ActorDeadError:
                pass
        return pairings

    def alive_monitor_count(self):
        return len(self.monitored_arvados_nodes())

    def assertShutdownCancellable(self, expected=True):
        self.assertTrue(self.node_shutdown.start.called)
        self.assertIs(expected,
                      self.node_shutdown.start.call_args[1]['cancellable'],
                      "ComputeNodeShutdownActor incorrectly cancellable")

    def test_easy_node_creation(self):
        size = testutil.MockSize(1)
        self.make_daemon(want_sizes=[size])
        self.stop_proxy(self.daemon)
        self.assertTrue(self.node_setup.start.called)

    def check_monitors_arvados_nodes(self, *arv_nodes):
        self.assertItemsEqual(arv_nodes, self.monitored_arvados_nodes())

    def test_node_pairing(self):
        cloud_node = testutil.cloud_node_mock(1)
        arv_node = testutil.arvados_node_mock(1)
        self.make_daemon([cloud_node], [arv_node])
        self.stop_proxy(self.daemon)
        self.check_monitors_arvados_nodes(arv_node)

    def test_node_pairing_after_arvados_update(self):
        cloud_node = testutil.cloud_node_mock(2)
        self.make_daemon([cloud_node],
                         [testutil.arvados_node_mock(2, ip_address=None)])
        arv_node = testutil.arvados_node_mock(2)
        self.daemon.update_arvados_nodes([arv_node]).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.check_monitors_arvados_nodes(arv_node)

    def test_arvados_node_un_and_re_paired(self):
        # We need to create the Arvados node mock after spinning up the daemon
        # to make sure it's new enough to pair with the cloud node.
        self.make_daemon([testutil.cloud_node_mock(3)], arvados_nodes=None)
        arv_node = testutil.arvados_node_mock(3)
        self.daemon.update_arvados_nodes([arv_node]).get(self.TIMEOUT)
        self.check_monitors_arvados_nodes(arv_node)
        self.daemon.update_cloud_nodes([]).get(self.TIMEOUT)
        self.assertEqual(0, self.alive_monitor_count())
        self.daemon.update_cloud_nodes([testutil.cloud_node_mock(3)])
        self.stop_proxy(self.daemon)
        self.check_monitors_arvados_nodes(arv_node)

    def test_old_arvados_node_not_double_assigned(self):
        arv_node = testutil.arvados_node_mock(3, age=9000)
        size = testutil.MockSize(3)
        self.make_daemon(arvados_nodes=[arv_node])
        self.daemon.update_server_wishlist([size]).get(self.TIMEOUT)
        self.daemon.update_server_wishlist([size, size]).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        used_nodes = [call[1].get('arvados_node')
                      for call in self.node_setup.start.call_args_list]
        self.assertEqual(2, len(used_nodes))
        self.assertIn(arv_node, used_nodes)
        self.assertIn(None, used_nodes)

    def test_node_count_satisfied(self):
        self.make_daemon([testutil.cloud_node_mock()],
                         want_sizes=[testutil.MockSize(1)])
        self.stop_proxy(self.daemon)
        self.assertFalse(self.node_setup.start.called)

    def test_dont_count_missing_as_busy(self):
        size = testutil.MockSize(1)
        self.make_daemon(cloud_nodes=[testutil.cloud_node_mock(1),
                                      testutil.cloud_node_mock(2)],
                         arvados_nodes=[testutil.arvados_node_mock(1),
                                      testutil.arvados_node_mock(2, last_ping_at='1970-01-01T01:02:03.04050607Z')],
                         want_sizes=[size, size])
        self.stop_proxy(self.daemon)
        self.assertTrue(self.node_setup.start.called)

    def test_missing_counts_towards_max(self):
        size = testutil.MockSize(1)
        self.make_daemon(cloud_nodes=[testutil.cloud_node_mock(1),
                                      testutil.cloud_node_mock(2)],
                         arvados_nodes=[testutil.arvados_node_mock(1),
                                        testutil.arvados_node_mock(2, last_ping_at='1970-01-01T01:02:03.04050607Z')],
                         want_sizes=[size, size],
                         max_nodes=2)
        self.stop_proxy(self.daemon)
        self.assertFalse(self.node_setup.start.called)

    def test_excess_counts_missing(self):
        size = testutil.MockSize(1)
        cloud_nodes = [testutil.cloud_node_mock(1), testutil.cloud_node_mock(2)]
        self.make_daemon(cloud_nodes=cloud_nodes,
                         arvados_nodes=[testutil.arvados_node_mock(1),
                                        testutil.arvados_node_mock(2, last_ping_at='1970-01-01T01:02:03.04050607Z')],
                         want_sizes=[size])
        self.assertEqual(2, self.alive_monitor_count())
        for mon_ref in self.monitor_list():
            self.daemon.node_can_shutdown(mon_ref.proxy()).get(self.TIMEOUT)
        self.assertEqual(1, self.node_shutdown.start.call_count)

    def test_missing_shutdown_not_excess(self):
        size = testutil.MockSize(1)
        cloud_nodes = [testutil.cloud_node_mock(1), testutil.cloud_node_mock(2)]
        self.make_daemon(cloud_nodes=cloud_nodes,
                         arvados_nodes=[testutil.arvados_node_mock(1),
                                        testutil.arvados_node_mock(2, last_ping_at='1970-01-01T01:02:03.04050607Z')],
                         want_sizes=[size])
        self.daemon.shutdowns.get()[cloud_nodes[1].id] = True
        self.assertEqual(2, self.alive_monitor_count())
        for mon_ref in self.monitor_list():
            self.daemon.node_can_shutdown(mon_ref.proxy()).get(self.TIMEOUT)
        self.assertEqual(0, self.node_shutdown.start.call_count)

    def test_booting_nodes_counted(self):
        cloud_node = testutil.cloud_node_mock(1)
        arv_node = testutil.arvados_node_mock(1)
        server_wishlist = [testutil.MockSize(1)] * 2
        self.make_daemon([cloud_node], [arv_node], server_wishlist)
        self.daemon.max_nodes.get(self.TIMEOUT)
        self.assertTrue(self.node_setup.start.called)
        self.daemon.update_server_wishlist(server_wishlist).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertEqual(1, self.node_setup.start.call_count)

    def test_boot_new_node_when_all_nodes_busy(self):
        arv_node = testutil.arvados_node_mock(2, job_uuid=True)
        self.make_daemon([testutil.cloud_node_mock(2)], [arv_node],
                         [testutil.MockSize(2)])
        self.stop_proxy(self.daemon)
        self.assertTrue(self.node_setup.start.called)

    def test_boot_new_node_below_min_nodes(self):
        min_size = testutil.MockSize(1)
        wish_size = testutil.MockSize(3)
        self.make_daemon([], [], None, min_size=min_size, min_nodes=2)
        self.daemon.update_server_wishlist([wish_size]).get(self.TIMEOUT)
        self.daemon.update_cloud_nodes([]).get(self.TIMEOUT)
        self.daemon.update_server_wishlist([wish_size]).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertEqual([wish_size, min_size],
                         [call[1].get('cloud_size')
                          for call in self.node_setup.start.call_args_list])

    def test_no_new_node_when_ge_min_nodes_busy(self):
        cloud_nodes = [testutil.cloud_node_mock(n) for n in range(1, 4)]
        arv_nodes = [testutil.arvados_node_mock(n, job_uuid=True)
                     for n in range(1, 4)]
        self.make_daemon(cloud_nodes, arv_nodes, [], min_nodes=2)
        self.stop_proxy(self.daemon)
        self.assertEqual(0, self.node_setup.start.call_count)

    def test_no_new_node_when_max_nodes_busy(self):
        self.make_daemon([testutil.cloud_node_mock(3)],
                         [testutil.arvados_node_mock(3, job_uuid=True)],
                         [testutil.MockSize(3)],
                         max_nodes=1)
        self.stop_proxy(self.daemon)
        self.assertFalse(self.node_setup.start.called)

    def start_node_boot(self, cloud_node=None, arv_node=None, id_num=1):
        if cloud_node is None:
            cloud_node = testutil.cloud_node_mock(id_num)
        if arv_node is None:
            arv_node = testutil.arvados_node_mock(id_num)
        self.make_daemon(want_sizes=[testutil.MockSize(id_num)])
        self.daemon.max_nodes.get(self.TIMEOUT)
        self.assertEqual(1, self.node_setup.start.call_count)
        self.last_setup.cloud_node.get.return_value = cloud_node
        self.last_setup.arvados_node.get.return_value = arv_node
        return self.last_setup

    def test_no_new_node_when_booted_node_not_usable(self):
        cloud_node = testutil.cloud_node_mock(4)
        arv_node = testutil.arvados_node_mock(4, crunch_worker_state='down')
        setup = self.start_node_boot(cloud_node, arv_node)
        self.daemon.node_up(setup).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())
        self.daemon.update_cloud_nodes([cloud_node])
        self.daemon.update_arvados_nodes([arv_node])
        self.daemon.update_server_wishlist(
            [testutil.MockSize(1)]).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertEqual(1, self.node_setup.start.call_count)

    def test_no_duplication_when_booting_node_listed_fast(self):
        # Test that we don't start two ComputeNodeMonitorActors when
        # we learn about a booting node through a listing before we
        # get the "node up" message from CloudNodeSetupActor.
        cloud_node = testutil.cloud_node_mock(1)
        setup = self.start_node_boot(cloud_node)
        self.daemon.update_cloud_nodes([cloud_node])
        self.daemon.node_up(setup).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())

    def test_no_duplication_when_booted_node_listed(self):
        cloud_node = testutil.cloud_node_mock(2)
        setup = self.start_node_boot(cloud_node, id_num=2)
        self.daemon.node_up(setup)
        self.daemon.update_cloud_nodes([cloud_node]).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())

    def test_node_counted_after_boot_with_slow_listing(self):
        # Test that, after we boot a compute node, we assume it exists
        # even it doesn't appear in the listing (e.g., because of delays
        # propagating tags).
        setup = self.start_node_boot()
        self.daemon.node_up(setup).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())
        self.daemon.update_cloud_nodes([]).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())

    def test_booted_unlisted_node_counted(self):
        setup = self.start_node_boot(id_num=1)
        self.daemon.node_up(setup)
        self.daemon.update_server_wishlist(
            [testutil.MockSize(1)]).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertEqual(1, self.node_setup.start.call_count)

    def test_booted_node_can_shutdown(self):
        setup = self.start_node_boot()
        self.daemon.node_up(setup).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())
        monitor = self.monitor_list()[0].proxy()
        self.daemon.update_server_wishlist([])
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertTrue(self.node_shutdown.start.called,
                        "daemon did not shut down booted node on offer")

    def test_booted_node_lifecycle(self):
        cloud_node = testutil.cloud_node_mock(6)
        setup = self.start_node_boot(cloud_node, id_num=6)
        self.daemon.node_up(setup).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())
        monitor = self.monitor_list()[0].proxy()
        self.daemon.update_server_wishlist([])
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.assertShutdownCancellable(True)
        shutdown = self.node_shutdown.start().proxy()
        shutdown.cloud_node.get.return_value = cloud_node
        self.daemon.node_finished_shutdown(shutdown).get(self.TIMEOUT)
        self.assertTrue(shutdown.stop.called,
                        "shutdown actor not stopped after finishing")
        self.assertTrue(monitor.actor_ref.actor_stopped.wait(self.TIMEOUT),
                        "monitor for booted node not stopped after shutdown")
        self.daemon.update_server_wishlist(
            [testutil.MockSize(2)]).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertTrue(self.node_setup.start.called,
                        "second node not started after booted node stopped")

    def test_booted_node_shut_down_when_never_listed(self):
        setup = self.start_node_boot()
        self.daemon.node_up(setup).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())
        self.assertFalse(self.node_shutdown.start.called)
        self.timer.deliver()
        self.stop_proxy(self.daemon)
        self.assertShutdownCancellable(False)

    def test_booted_node_shut_down_when_never_paired(self):
        cloud_node = testutil.cloud_node_mock(2)
        setup = self.start_node_boot(cloud_node)
        self.daemon.node_up(setup).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())
        self.daemon.update_cloud_nodes([cloud_node])
        self.timer.deliver()
        self.stop_proxy(self.daemon)
        self.assertShutdownCancellable(False)

    def test_booted_node_shut_down_when_never_working(self):
        cloud_node = testutil.cloud_node_mock(4)
        arv_node = testutil.arvados_node_mock(4, crunch_worker_state='down')
        setup = self.start_node_boot(cloud_node, arv_node)
        self.daemon.node_up(setup).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())
        self.daemon.update_cloud_nodes([cloud_node])
        self.daemon.update_arvados_nodes([arv_node]).get(self.TIMEOUT)
        self.timer.deliver()
        self.stop_proxy(self.daemon)
        self.assertShutdownCancellable(False)

    def test_node_that_pairs_not_considered_failed_boot(self):
        cloud_node = testutil.cloud_node_mock(3)
        arv_node = testutil.arvados_node_mock(3)
        setup = self.start_node_boot(cloud_node, arv_node)
        self.daemon.node_up(setup).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())
        self.daemon.update_cloud_nodes([cloud_node])
        self.daemon.update_arvados_nodes([arv_node]).get(self.TIMEOUT)
        self.timer.deliver()
        self.stop_proxy(self.daemon)
        self.assertFalse(self.node_shutdown.start.called)

    def test_node_that_pairs_busy_not_considered_failed_boot(self):
        cloud_node = testutil.cloud_node_mock(5)
        arv_node = testutil.arvados_node_mock(5, job_uuid=True)
        setup = self.start_node_boot(cloud_node, arv_node)
        self.daemon.node_up(setup).get(self.TIMEOUT)
        self.assertEqual(1, self.alive_monitor_count())
        self.daemon.update_cloud_nodes([cloud_node])
        self.daemon.update_arvados_nodes([arv_node]).get(self.TIMEOUT)
        self.timer.deliver()
        self.stop_proxy(self.daemon)
        self.assertFalse(self.node_shutdown.start.called)

    def test_booting_nodes_shut_down(self):
        self.make_daemon(want_sizes=[testutil.MockSize(1)])
        self.daemon.update_server_wishlist([]).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertTrue(self.last_setup.stop_if_no_cloud_node.called)

    def test_all_booting_nodes_tried_to_shut_down(self):
        size = testutil.MockSize(2)
        self.make_daemon(want_sizes=[size])
        self.daemon.max_nodes.get(self.TIMEOUT)
        setup1 = self.last_setup
        setup1.stop_if_no_cloud_node().get.return_value = False
        setup1.stop_if_no_cloud_node.reset_mock()
        self.daemon.update_server_wishlist([size, size]).get(self.TIMEOUT)
        self.daemon.max_nodes.get(self.TIMEOUT)
        self.assertIsNot(setup1, self.last_setup)
        self.last_setup.stop_if_no_cloud_node().get.return_value = True
        self.last_setup.stop_if_no_cloud_node.reset_mock()
        self.daemon.update_server_wishlist([]).get(self.TIMEOUT)
        self.daemon.max_nodes.get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertEqual(1, self.last_setup.stop_if_no_cloud_node.call_count)
        self.assertTrue(setup1.stop_if_no_cloud_node.called)

    def test_shutdown_declined_at_wishlist_capacity(self):
        cloud_node = testutil.cloud_node_mock(1)
        size = testutil.MockSize(1)
        self.make_daemon(cloud_nodes=[cloud_node], want_sizes=[size])
        self.assertEqual(1, self.alive_monitor_count())
        monitor = self.monitor_list()[0].proxy()
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertFalse(self.node_shutdown.start.called)

    def test_shutdown_declined_below_min_nodes(self):
        cloud_node = testutil.cloud_node_mock(1)
        self.make_daemon(cloud_nodes=[cloud_node], min_nodes=1)
        self.assertEqual(1, self.alive_monitor_count())
        monitor = self.monitor_list()[0].proxy()
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertFalse(self.node_shutdown.start.called)

    def test_shutdown_accepted_below_capacity(self):
        self.make_daemon(cloud_nodes=[testutil.cloud_node_mock()])
        self.assertEqual(1, self.alive_monitor_count())
        monitor = self.monitor_list()[0].proxy()
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertTrue(self.node_shutdown.start.called)

    def test_shutdown_declined_when_idle_and_job_queued(self):
        cloud_nodes = [testutil.cloud_node_mock(n) for n in [3, 4]]
        arv_nodes = [testutil.arvados_node_mock(3, job_uuid=True),
                     testutil.arvados_node_mock(4, job_uuid=None)]
        self.make_daemon(cloud_nodes, arv_nodes, [testutil.MockSize(1)])
        self.assertEqual(2, self.alive_monitor_count())
        for mon_ref in self.monitor_list():
            monitor = mon_ref.proxy()
            if monitor.cloud_node.get(self.TIMEOUT) is cloud_nodes[-1]:
                break
        else:
            self.fail("monitor for idle node not found")
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertFalse(self.node_shutdown.start.called)

    def test_node_shutdown_after_cancelled_shutdown(self):
        cloud_node = testutil.cloud_node_mock(5)
        self.make_daemon([cloud_node], [testutil.arvados_node_mock(5)])
        self.assertEqual(1, self.alive_monitor_count())
        monitor = self.monitor_list()[0].proxy()
        shutdown_proxy = self.node_shutdown.start().proxy
        shutdown_proxy().cloud_node.get.return_value = cloud_node
        shutdown_proxy().success.get.return_value = False
        shutdown_proxy.reset_mock()
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.assertTrue(shutdown_proxy.called)
        self.daemon.node_finished_shutdown(shutdown_proxy()).get(self.TIMEOUT)
        shutdown_proxy().success.get.return_value = True
        shutdown_proxy.reset_mock()
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.assertTrue(shutdown_proxy.called)

    def test_broken_node_blackholed_after_cancelled_shutdown(self):
        cloud_node = testutil.cloud_node_mock(8)
        wishlist = [testutil.MockSize(8)]
        self.make_daemon([cloud_node], [testutil.arvados_node_mock(8)],
                         wishlist)
        self.assertEqual(1, self.alive_monitor_count())
        self.assertFalse(self.node_setup.start.called)
        monitor = self.monitor_list()[0].proxy()
        shutdown_proxy = self.node_shutdown.start().proxy
        shutdown_proxy().cloud_node.get.return_value = cloud_node
        shutdown_proxy().success.get.return_value = False
        shutdown_proxy().cancel_reason.get.return_value = self.node_shutdown.NODE_BROKEN
        self.daemon.update_server_wishlist([]).get(self.TIMEOUT)
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.daemon.node_finished_shutdown(shutdown_proxy()).get(self.TIMEOUT)
        self.daemon.update_cloud_nodes([cloud_node]).get(self.TIMEOUT)
        self.daemon.update_server_wishlist(wishlist).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertEqual(1, self.node_setup.start.call_count)

    def test_nodes_shutting_down_replaced_below_max_nodes(self):
        cloud_node = testutil.cloud_node_mock(6)
        self.make_daemon([cloud_node], [testutil.arvados_node_mock(6)])
        self.assertEqual(1, self.alive_monitor_count())
        monitor = self.monitor_list()[0].proxy()
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.assertTrue(self.node_shutdown.start.called)
        self.daemon.update_server_wishlist(
            [testutil.MockSize(6)]).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertTrue(self.node_setup.start.called)

    def test_nodes_shutting_down_not_replaced_at_max_nodes(self):
        cloud_node = testutil.cloud_node_mock(7)
        self.make_daemon([cloud_node], [testutil.arvados_node_mock(7)],
                         max_nodes=1)
        self.assertEqual(1, self.alive_monitor_count())
        monitor = self.monitor_list()[0].proxy()
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.assertTrue(self.node_shutdown.start.called)
        self.daemon.update_server_wishlist(
            [testutil.MockSize(7)]).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertFalse(self.node_setup.start.called)

    def test_nodes_shutting_down_count_against_excess(self):
        cloud_nodes = [testutil.cloud_node_mock(n) for n in [8, 9]]
        arv_nodes = [testutil.arvados_node_mock(n) for n in [8, 9]]
        self.make_daemon(cloud_nodes, arv_nodes, [testutil.MockSize(8)])
        self.assertEqual(2, self.alive_monitor_count())
        for mon_ref in self.monitor_list():
            self.daemon.node_can_shutdown(mon_ref.proxy()).get(self.TIMEOUT)
        self.assertEqual(1, self.node_shutdown.start.call_count)

    def test_clean_shutdown_waits_for_node_setup_finish(self):
        new_node = self.start_node_boot()
        new_node.stop_if_no_cloud_node().get.return_value = False
        new_node.stop_if_no_cloud_node.reset_mock()
        self.daemon.shutdown().get(self.TIMEOUT)
        self.assertTrue(new_node.stop_if_no_cloud_node.called)
        self.daemon.node_up(new_node).get(self.TIMEOUT)
        self.assertTrue(new_node.stop.called)
        self.timer.deliver()
        self.assertTrue(
            self.daemon.actor_ref.actor_stopped.wait(self.TIMEOUT))

    def test_wishlist_ignored_after_shutdown(self):
        new_node = self.start_node_boot()
        new_node.stop_if_no_cloud_node().get.return_value = False
        new_node.stop_if_no_cloud_node.reset_mock()
        self.daemon.shutdown().get(self.TIMEOUT)
        size = testutil.MockSize(2)
        self.daemon.update_server_wishlist([size] * 2).get(self.TIMEOUT)
        self.timer.deliver()
        self.stop_proxy(self.daemon)
        self.assertEqual(1, self.node_setup.start.call_count)

    def test_shutdown_actor_stopped_when_cloud_node_delisted(self):
        self.make_daemon(cloud_nodes=[testutil.cloud_node_mock()])
        self.assertEqual(1, self.alive_monitor_count())
        monitor = self.monitor_list()[0].proxy()
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        self.daemon.update_cloud_nodes([]).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertEqual(
            1, self.node_shutdown.start().proxy().stop().get.call_count)

    def test_shutdown_actor_cleanup_copes_with_dead_actors(self):
        self.make_daemon(cloud_nodes=[testutil.cloud_node_mock()])
        self.assertEqual(1, self.alive_monitor_count())
        monitor = self.monitor_list()[0].proxy()
        self.daemon.node_can_shutdown(monitor).get(self.TIMEOUT)
        # We're mainly testing that update_cloud_nodes catches and handles
        # the ActorDeadError.
        stop_method = self.node_shutdown.start().proxy().stop().get
        stop_method.side_effect = pykka.ActorDeadError
        self.daemon.update_cloud_nodes([]).get(self.TIMEOUT)
        self.stop_proxy(self.daemon)
        self.assertEqual(1, stop_method.call_count)
