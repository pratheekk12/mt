import invoices from '../views/admin/invoices';
import Orders from '../views/admin/orders';
import Dashboard from '../views/DashboardView/index';
import agentDispostionList from '../views/admin/agentlastfive';
import agentOpentTickets from '../views/admin/agentopenTickets';
import distribuerCallDisposedList from '../views/admin/distributerlastfive';
import Customers from '../views/admin/callerInteractions'

export default [
  {
    path: '/dashboard',
    exact: false,
    key: 'dashboard',
    component: Dashboard
  },
  {
    path: '/orders',
    exact: true,
    key: 'order',
    component: Orders,
    crumb: 'Orders'
  },
  {
    path: '/orders/:orderId',
    exact: true,
    key: 'orderWithId',
    component: Orders
  },
  {
    path: '/invoices',
    exact: true,
    key: 'invoices',
    component: invoices,
    crumb: 'Invoices'
  },
  {
    path: '/invoices/:orderId',
    exact: true,
    key: 'invoicesWithId',
    component: invoices
  },
  {
    path: '/agentlastfive',
    exact: true,
    key: 'agentlastfive',
    component: agentDispostionList,
    crumb: 'Agent Dispositon List'
  },
  {
    path: '/agentopentickets',
    exact: true,
    key: 'Open Ticckets',
    component: agentOpentTickets,
    crumb: 'Agent Open Ticket Lists'
  },
  {
    path: '/agentlastfive/:uniqueId',
    exact: true,
    key: 'uniqueId',
    component: agentDispostionList
  },
  {
    path: '/distributerDisposedCallList',
    exact: true,
    key: 'distributerDisposedCallList',
    component: distribuerCallDisposedList,
    crumb: 'Distributer Call Dispositon List'
  },
  {
    path: '/distributercall/:uniqueId',
    exact: true,
    key: 'distributerCallById',
    component: distribuerCallDisposedList
  },
  {
    path: '/callerInteraction/:callerNumber',
    exact: true,
    // key: 'distributerCallById',
    component: Customers
  }
];
