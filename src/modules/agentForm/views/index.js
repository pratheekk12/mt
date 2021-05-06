import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import RouteSwitch from 'src/components/RouteSwitch';
import getAgentModule from '../redux/module';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';

export default function index({ routes }) {
  return (
    <DynamicModuleLoader modules={[getAgentModule()]}>
      <CustomBreadcrumbs />
      <RouteSwitch routes={routes} redirectPath="/agent/dashboard" />
    </DynamicModuleLoader>
  );
}
