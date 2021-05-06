import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import RouteSwitch from 'src/components/RouteSwitch';
import getFaqModule from '../redux/module';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';

export default function index({ routes }) {
  return (
    <DynamicModuleLoader modules={[getFaqModule()]}>
      <CustomBreadcrumbs />
      <RouteSwitch routes={routes} redirectPath="/faq/dashboard" />
    </DynamicModuleLoader>
  );
}
