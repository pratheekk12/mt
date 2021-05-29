import React, { useState } from 'react'
import XLSX from "xlsx";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const FileUpload = (props) => {
    const { id, handleUpload ,retries, campaignID} = props
    const [data1, setData1] = useState([])




    const handleFileChosen = (file) => {
        const formData = new FormData();

          // Update the formData object
          console.log("file",file)
          formData.append('file', file, file.name);

          formData.append('retries', retries);
          formData.append('ivrCampaignName', campaignID);
       

            axios.post(`http://192.168.3.36:62010/channel/uploadivrfile`,formData)
                .then((response) => {
                    console.log(response.data)
                    alert(`file uploaded succesfully`)
                })
                .catch((err) => {
                    console.log(err)
                })


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