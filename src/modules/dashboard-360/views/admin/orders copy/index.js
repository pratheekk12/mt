import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { setDistributorOrders } from 'src/modules/dashboard-360/redux/action';
import { orderColumns } from 'src/modules/dashboard-360/utils/columns-config';
import PropTypes from 'prop-types';
import CommonAlert from 'src/components/CommonAlert';
import MainLoader from 'src/components/MainLoader';
import { Box, makeStyles, Typography } from '@material-ui/core';
import {
  getDealerOrderDetails,
  getSingleOrderDetails
} from '../../DashboardView/apiCalls';

const style = makeStyles(() => ({
  dgContainer: {
    maxHeight: 628
  }
}));
function Orders({ distributorOrders, setDistributorOrdersAction, ...props }) {
  const classes = style();
  const [showLoader, setShowLoader] = useState(true);
  const {
    match: {
      params: { orderId }
    }
  } = props;

  const [orderDetails, setSingleOrderDetails] = useState(null);

  const orderIdPrev = useRef(orderId);

  useEffect(() => {
    if (!distributorOrders || orderIdPrev !== orderId) {
      (async function getDetails() {
        try {
          const res = await (orderId
            ? getSingleOrderDetails(orderId)
            : getDealerOrderDetails(1001));
          if (!orderId) {
            setDistributorOrdersAction(res.data.data);
          } else {
            setSingleOrderDetails(res.data.data);
          }
        } catch (error) {
        
        } finally {
          setShowLoader(false);
        }
      })();
    }
  }, [orderId]);
  const [page, setPage] = useState(1);
  return distributorOrders ? (
    // <Card>
    <div className={classes.dgContainer}>
      <Box padding="1rem 0.5rem">
        <Typography variant="h6" component="h4">
          All Orders
        </Typography>
      </Box>
      <DataGrid
        page={page}
        onPageChange={params => {
          setPage(params.page);
        }}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        autoHeight
        columns={orderColumns}
        rows={distributorOrders.map(order => ({
          ...order,
          id: order.OrderNumber
        }))}
      />
    </div>
  ) : // </Card>
  showLoader ? (
    <MainLoader />
  ) : (
    <CommonAlert style={{ margin: 20 }} />
  );
}

Orders.propTypes = {
  distributorOrders: PropTypes.arrayOf(PropTypes.object),
  setDistributorOrdersAction: PropTypes.func
};

const mapStateToProps = state => ({
  distributorOrders: state.distributorOrders
});

const mapDispatchToProps = dispatch => ({
  setDistributorOrdersAction: orders => dispatch(setDistributorOrders(orders))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
