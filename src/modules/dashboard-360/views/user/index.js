import React from 'react';
import RouteSwitch from 'src/components/RouteSwitch';

export default function user({ routes }) {
    return (
        <>
            <RouteSwitch routes={routes} redirectPath="/user" />
        </>
    );
}
