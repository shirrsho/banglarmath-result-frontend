import React, { useState } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import axios from 'axios';

function Export( {resultsheet, tags, n_ques} ) {

    const [student_id, setStudent_id] = useState();

    const exportCsv = async () => {

        let newresult = []

        await axios.get(`http://localhost:3001/result/${n_ques}/${student_id}`)
        .then((response) => {
            // Check if the request was successful.
            if (response.status === 200) {
            // Get the response data.
            const data = response.data;
            newresult = data;
            // Display the data.
            console.log(data);
            } else {
            // Display an error message.
            console.log("Error: " + response.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });

        const blob = new Blob([Papa.unparse(newresult)], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'result_'+student_id+'.csv');
    }

    return (
        <div>
            Export CSV Result:<br/><br/>
            <label>Student ID: </label><input onChange={(e)=>setStudent_id(e.target.value)}></input>
            <button onClick={exportCsv}>Export</button>
            <div style={{height:"100px"}}></div>
        </div>
    );
}

export default Export;
