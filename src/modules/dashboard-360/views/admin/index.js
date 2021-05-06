import React from 'react';
import RouteSwitch from 'src/components/RouteSwitch';

export default function admin({ routes }) {
    return (
        <>
            <RouteSwitch routes={routes} redirectPath="/admin" />
        </>
    );
}
