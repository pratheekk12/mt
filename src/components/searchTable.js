import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  },
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontWeight: 'bold'
  }
}));

const BasicTable = ({
  columns,
  className,
  records,
  redirectLink,
  redirectLabel,
//   setRootData,
//   setdealerDetails,
//   selectedData,
  ...rest
}) => {
  const classes = useStyles();
  function showthedata(row){
   
    // selectedData(row)
    // setdealerDetails(row)

    // localStorage.setItem('L1ID',row.asterixUniqueID)
    // setRootData([[],[{
    //    callNumber:row.callerNumber,
    //      callerName:row.CallerName
    //    }],[],[],[]])
    // setCallerDetails({
    //   callNumber:row.callerNumber,
    //   callerName:row.CallerName
    // })
    // props.setdealerDetails({
    //   callNumber:row.callerNumber,
    //   callerName:row.CallerName
    // })
    
    // alert('data')
  }
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Divider />
      <PerfectScrollbar>
        <Box width={'100%'}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col, index) => (
                  <TableCell key={col.field || index}>
                    {col.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {records?.map((record, index) => (
                <TableRow hover key={record.id || index}  onClick={( ) => showthedata(record)}>
                  {columns.map((col, index2) => (
                    <TableCell key={`cell-${index}-${index2}`}>
                      {col.renderCell
                        ? col.renderCell({ row: record })
                        : record[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {redirectLink && (
        <Box display="flex" justifyContent="flex-end" p={2} alignItems="center">
          <Link to={redirectLink} className={classes.linkContainer}>
            {redirectLabel}
            <ArrowRightIcon />
          </Link>
        </Box>
      )}
    </Card>
  );
};
