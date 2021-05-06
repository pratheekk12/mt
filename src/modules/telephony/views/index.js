import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import RouteSwitch from 'src/components/RouteSwitch';
import getTelephonyModule from '../redux/module';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';

export default function index({ routes }) {
  return (
    <DynamicModuleLoader modules={[getTelephonyModule()]}>
      <CustomBreadcrumbs />
      <RouteSwitch routes={routes} redirectPath="/telephony/dashboard" />
    </DynamicModuleLoader>
  );
}
