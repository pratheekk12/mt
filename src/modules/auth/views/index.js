import React from 'react';
import RouteSwitch from 'src/components/RouteSwitch';

export default function index({ routes }) {
  return (
    <>
      <RouteSwitch routes={routes} redirectPath="/auth/login" />
    </>
  );
}
