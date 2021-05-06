import { CircularProgress } from '@material-ui/core';
import React from 'react';

export default function Spinner() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </div>
  );
}
