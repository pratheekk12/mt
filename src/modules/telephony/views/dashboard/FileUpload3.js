import React, { useState } from 'react'
import XLSX from "xlsx";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { CAMPAIGN } from 'src/modules/dashboard-360/utils/endpoints'

const FileUpload = (props) => {
    const { id, handleUpload } = props
    const [data1, setData1] = useState([])



    // console.log(data1)

    const handleFileChosen = (file) => {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = ({ target: { result } }) => {
            const wb = XLSX.read(result, { type: rABS ? "binary" : "array" });
            const wsname = wb.SheetNames[0];

            const ws = wb.Sheets[wsname];

            const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });

            // console.log(data.length)
            // console.log(data)
            // console.log(data[0])
            // console.log(data.pop())
            // data.pop()
            data.shift()
            let arr = []

            data.map((ele) => {
                let obj = {
                    "crmUID": uuidv4(),
                    "cutomerpno": `${ele[3]}`,
                    "campaignID": id,
                    "prefix": "5"
                }
                return arr.push(obj)
            })

            const data3 = { data: arr }
            // console.log(data3)

            axios.post(`${CAMPAIGN}/Upload_Campaign`, data3)
                .then((response) => {
                    console.log(response.data)
                    alert(`file uploaded succesfully`)
                })
                .catch((err) => {
                    console.log(err)
                })
        };

        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);


    };

    return (
        <div>
            <div className="form-group col-md-6">
                {/* <label>Bank Statement File {idx + 1}</label> */}
                <input type="file" className="form-control"
                    name="bankfile"
                    // data-id={idx}
                    // onChange={this.onChange}
                    // onChange={this.onChangeHandler}
                    onChange={e => handleFileChosen(e.target.files[0])}
                    // value={this.state.bankfile}
                    // defaultValue={this.state.upload[idx].bankfile}
                    // id={bankfile}
                    accept='.csv, .xls,.xlsx'
                    placeholder="true" multiple required />
            </div>


        </div>
    );
}

export default FileUpload