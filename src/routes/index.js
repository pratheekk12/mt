import routes from 'src/modules/dashboard-360/routes';
import React from 'react';
import telephonyRoutes from '../modules/telephony/routes';
import faqRoutes from '../modules/FAQ/routes';

import authRoutes from '../modules/auth/routes';

import agentRoutes from '../modules/agentForm/routes';
import groupRoutes from '../modules/groupadminForm/routes';
import campaign from '../modules/telephony/views/dashboard/campaign'

import ivrcampaign from '../modules/telephony/views/dashboard/ivrcampaign'
import manageagents from 'src/modules/telephony/views/dashboard/Auto-report/manageagents'
import AgentPerformance from 'src/modules/telephony/views/dashboard/Auto-report/agentperformance'
import interactionreport from 'src/modules/telephony/views/dashboard/Auto-report/interationreport'
import cdrreport from 'src/modules/telephony/views/dashboard/Auto-report/cdrReport'
import queuereport from 'src/modules/telephony/views/dashboard/Auto-report/queueReport'
import createcampaign from 'src/modules/telephony/views/dashboard/Createcampaign'
export const dash360 = React.lazy(() =>
  import('src/modules/dashboard-360/views')
);

export const telephony = React.lazy(() =>
  import('src/modules/telephony/views/index')
);

export const faq = React.lazy(() =>
  import('src/modules/FAQ/views/index')
);

export const agentform = React.lazy(() =>
  import('src/modules/agentForm/views/index')
);
export const groupform = React.lazy(() =>
  import('src/modules/groupadminForm/views/index')
);
export const auth = React.lazy(() => import('src/modules/auth/views/index'));

export default [
  {
    path: '/dash360',
    routes,
    key: 'dash360',
    component: dash360,
    crumb: 'Interaction',
    requiresAuth: true
  },

  {
    path: '/telephony',
    routes: telephonyRoutes,
    key: 'telephony',
    component: telephony,
    crumb: 'Admin',
    requiresAuth: true
  },

  {
    path: '/faq',
    routes: faqRoutes,
    key: 'faq',
    component: faq,
    crumb: 'faq',
    requiresAuth: true
  },
  {
    path: '/agent',
    routes: agentRoutes,
    key: 'dashboardagent',
    component: agentform,
    crumb: 'Agents',
    requiresAuth: true
  },
  {
    path: '/group',
    routes: groupRoutes,
    key: 'dashboardgroup',
    component: groupform,
    crumb: 'Groups',
    requiresAuth: true
  },
  {
    path: '/auth',
    routes: authRoutes,
    key: 'auth',
    component: auth,
    requiresAuth: false
  },
  {
    path: '/campaign',
    component: campaign,
    requiresAuth: true
  },
  {
    path: '/ivrcampaign',
    component: ivrcampaign,
    requiresAuth: true
  },
  {
    path: '/manageagents',
    component: manageagents,
    requiresAuth: true
  },
  {
    path: '/agentPerformance',
    component: AgentPerformance,
    requiresAuth: true
  },
  {
    path: '/interactionreport',
    component: interactionreport,
    requiresAuth: true
  },
  {
    path: '/createcampaign',
    component: createcampaign,
    requiresAuth: true
  },
  {
    path: '/queuereport',
    component: queuereport,
    requiresAuth: true
  },
  {
    path: '/cdrreport',
    component: cdrreport,
    requiresAuth: true
  },
];
