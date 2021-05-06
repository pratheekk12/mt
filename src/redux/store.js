import { createStore } from 'redux-dynamic-modules-core';
import getWeatherModule from './rootModule';

export default createStore(
    {
        id: 'root',
    },
    getWeatherModule()
);
