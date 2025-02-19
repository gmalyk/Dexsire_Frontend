import React from 'react';
import RefundPage from 'screens/Refund';

export const routes = [
    {
        path: '/refund',
        component: RefundPage,
        exact: true,
        authenticated: false
    }
];

export default routes; 