import React, { useState } from 'react';

function Export( {resultsheet, n_ques} ) {

    const [student_id, setStudent_id] = useState();
    const [student_name, setStudent_name] = useState();

    const exportCsv = () => {
        resultsheet.forEach(result => {
            if(student_id===result.Id){
                setStudent_name(result.Name);
            }
        });
    }

    return (
        <div>
            Export CSV Result:<br/><br/>
            <label>Student ID: </label><input onChange={(e)=>setStudent_id(e.target.value)}></input>
            <button onClick={exportCsv}>Export</button>
            <div style={{height:"100px"}}></div>
            {student_name}
        </div>
    );
}

export default Export;
