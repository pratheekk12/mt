import React from 'react';
import {
    JsonToCsv,
  
} from 'react-json-csv';

export default function DownloadReport({ DownloadData }) {
  
    var filename = 'Download'
    var fields = {
        "no data": "no data"
    }
    var style = {
        padding: "5px"
    }
    var data = [{
        "no data": ""
    }]
    var text = "Download";
    if (DownloadData.length) {

        var result = Object.keys(DownloadData[0])
        var header = {};
        for (var i = 0; i < result.length; i += 1) {
            header[result[i]] = result[i];
        }
        filename = 'Download'
        fields = header
        style = {
            padding: "5px"
        }
        data = DownloadData
        text = "Download"


    }
    else {
        filename = 'Download'
        fields = {
            "no data": ""
        }
        style = {
            padding: "5px"
        }
        data = [{
            "no data": "no data"
        }]
        text = "Download"
    }
    return (
        <div>
            {DownloadData.length ? <JsonToCsv
                data={data}
                filename={filename}
                fields={fields}
                style={style}
                text={text}
            /> : <></>}
        </div>

    );
}
