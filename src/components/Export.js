import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import axios from 'axios';
import Select from 'react-select';
import Resultsheet from './Resultsheet';

function Export() {

    const [exams, setExams] = useState([]);
    const [student_id, setStudent_id] = useState();
    const [examcode, setExamcode] = useState();
    const [studentresultsheet, setStudentresultsheet] = useState();

    const getExams = async () => {
        let texams = []

        await axios.get(`http://localhost:3001/exams`)
        .then((response) => {
            // Check if the request was successful.
            if (response.status === 200) {
                // console.log(response.data)
                const data = response.data;
                data.infos.forEach(element => {
                    texams.push({
                        value:element.examcode,
                        label:element.examcode+'-'+element.examname
                    })
                });
                setExams(texams);
            } else {
                // Display an error message.
                console.log("Error: " + response.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const exportCsv = async () => {

        let newresult = []

        await axios.get(`http://localhost:3001/result/${examcode}/${student_id}`)
        .then((response) => {
            // Check if the request was successful.
            if (response.status === 200) {
                // console.log(response.data)
                const data = response.data;
                // setStudent_name(data.studentresult.Name)
                // newresult = data.studentresult;
                // Display the data.
                setStudentresultsheet(data)
                console.log(data);
                // const blob = new Blob([Papa.unparse(newresult)], { type: 'text/csv;charset=utf-8' });
                // saveAs(blob, 'result_'+student_id+'.csv');
                
            } else {
                // Display an error message.
                console.log("Error: " + response.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleExamSelection = (exam) => {
        setExamcode(exam.value);
        console.log("eas: ",exam.value);
    }

    useEffect(()=>{
        getExams();
    },[])

    return (
        <div>
            {/* Export CSV Result:<br/><br/> */}
            <label>Exam: </label> 
            {/* <input type='text' onChange={(e)=>setExamcode(e.target.value)}/><br/> */}
            <Select options={exams} onChange={handleExamSelection}/>
            <label>Student ID: </label><input onChange={(e)=>setStudent_id(e.target.value)}/><br/>
            <button onClick={exportCsv}>Export</button>
            <div style={{height:"100px"}}></div>
            <Resultsheet studentresultsheet={studentresultsheet}/>
        </div>
    );
}

export default Export;
