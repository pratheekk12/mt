// import { distributorOrders, distributorInvoices } from './reducers';

export default function getTelephonyModule() {
  return {
    // Unique id of the module
    id: 'faq',
    // Maps the Store key to the reducer
    reducerMap: {
      // distributorOrders,
      // distributorInvoices
    }
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
  };
}
