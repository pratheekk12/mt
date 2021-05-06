import { ADMIN, USER } from '../../../redux/constants';
import adminRoutes from './adminRoutes';
import userRoutes from './userRoutes';
import MainLayout from '../layouts/MainLayout/index';
import DashboardLayout from '../layouts/DashboardLayout/index';

export default [
    {
        path: '/admin',
        accountType: ADMIN,
        routes: adminRoutes,
        key: 'admin',
        component: MainLayout
    },
    {
        path: '/user',
        accountType: USER,
        routes: userRoutes,
        key: 'user',
        component: DashboardLayout
    }
];
