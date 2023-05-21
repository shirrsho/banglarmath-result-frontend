import React, { useState } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import axios from 'axios';

function Export() {

    const [student_id, setStudent_id] = useState();
    const [student_name, setStudent_name] = useState();

    const exportCsv = async () => {

        let newresult = []

        await axios.get(`http://localhost:3001/result/${student_id}`)
        .then((response) => {
            // Check if the request was successful.
            if (response.status === 200) {
                console.log(response.data)
                const data = response.data;
                setStudent_name(data.Name)
                newresult = data.studentresult;
                // Display the data.
                console.log(data);
                const blob = new Blob([Papa.unparse(newresult)], { type: 'text/csv;charset=utf-8' });
                saveAs(blob, 'result_'+student_id+'.csv');
            } else {
                // Display an error message.
                console.log("Error: " + response.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            {/* Export CSV Result:<br/><br/> */}
            <label>Student ID: </label><input onChange={(e)=>setStudent_id(e.target.value)}></input>
            <button onClick={exportCsv}>Export</button>
            <div style={{height:"100px"}}></div>
            {student_name}
        </div>
    );
}

export default Export;
