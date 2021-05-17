import { Button } from '@material-ui/core';
import React from 'react';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelReport = ({ data, fileName }) => {
    return (
        <ExcelFile
            filename={fileName}
            element={
                <Button variant="contained" color="primary" size="small">
                    Download
        </Button>
            }
        >
            <ExcelSheet data={data} name="Table">
                {Object.entries(data[0]).map(([key, value]) => {
                    return <ExcelColumn label={key} key={key} value={key} />;
                })}
            </ExcelSheet>
        </ExcelFile>
    );
};

export default ExcelReport;