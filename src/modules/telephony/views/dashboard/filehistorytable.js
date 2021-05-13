import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader, Grid } from '@material-ui/core';
import axios from 'axios';
import ExcelReport from 'src/components/ExcelReport';

const FileHistoryTable = ({ status }) => {
    const [fileHistoryList, setFileHistoryList] = useState(null);

    const getDispositionData = async () => {
        await axios
            .get('/channel/excel-uploads')
            .then(res => {
                setFileHistoryList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getDispositionData();
    }, [status]);

    const columns = [
        {
            field: 'uploadedBy',
            headerName: 'Uploaded By',
            flex: 1,
            renderCell: rowData => rowData.row.uploadedBy
        },
        {
            field: 'fileName',
            headerName: 'File Name',
            flex: 1,
            renderCell: rowData => rowData.row.fileName
        },
        {
            field: 'createdAt',
            headerName: 'Date',
            flex: 1,
            renderCell: rowData => rowData.row.createdAt.slice(0, 10)
        },
        {
            field: 'timeAt',
            headerName: 'Time',
            flex: 1,
            renderCell: rowData => rowData.row.createdAt.slice(11, 19)
        },
        {
            field: 'recordCount',
            headerName: 'Records Count',
            flex: 1,
            renderCell: rowData => rowData.row.recordCount
        }
    ];
    return (
        <>
            <Card style={{ marginTop: '2rem' }}>
                <Grid container direction="row" justify="flex-end">
                    <Grid item xs={6}>
                        <CardHeader title={'File History Records'} />
                    </Grid>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            paddingRight: '2rem'
                        }}
                    >
                        {fileHistoryList && fileHistoryList.length > 0 && (
                            <ExcelReport
                                data={fileHistoryList}
                                fileName={'File History Table'}
                            />
                        )}
                    </div>
                </Grid>
            </Card>
            <Card style={{ height: 420, width: '100%', padding: '1rem' }}>
                <DataGrid
                    columns={columns}
                    rows={
                        fileHistoryList !== null && fileHistoryList.length > 0
                            ? fileHistoryList.map(data => ({
                                ...data,
                                id: data._id
                            }))
                            : []
                    }
                    pageSize={5}
                    // rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    autoHeight
                />
            </Card>
        </>
    );
};

export default FileHistoryTable;