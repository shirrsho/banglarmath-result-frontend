import React, { useState } from 'react';
import Papa from 'papaparse';

function ResultSheetUpload({ setExaminformation }) {

  // const [file, setFile] = useState();
  const [examcode, setExamcode] = useState("");
  const [examname, setExamname] = useState("");
  const [jsonResult, setJsonResult] = useState({});
  const [nques, setNques] = useState(0);
  let newexamresult;

  const handleFileUpload = (event) => {
    // setFile(event.target.files[0]);
    convertToJSON(event.target.files[0]);
  }

  const handleHowManyQues = (event) => {
    setNques(event.target.value);
  }

  const handleExamCode = (event) => {
    setExamcode(event.target.value);
  }

  const handleExamName = (event) => {
    setExamname(event.target.value);
  }

  const convertToJSON = (file) => {
    if (file == null) return;
    console.log("not null");
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        console.log(results.data);
        setJsonResult(results.data);
      }
    });
  }

  const addNewResultSheet = () => {
    /*
      Check for Invalid Fields
    */
    newexamresult = {
      examname: examname,
      examcode: examcode,
      nques: nques,
      resultsheet: jsonResult
    }
    setExaminformation(newexamresult);
  }

  return (
    <div className='examinformationcomponent'>
      <label>Exam Code: </label><input type='text' onChange={handleExamCode} /> <br/>
      <label>Exam Name: </label><input type='text' onChange={handleExamName} /> <br/>
      <label>Result Sheet (CSV): </label><input type='file' onChange={handleFileUpload} /> <br/>
      <label>Number of Questions: </label><input type='number' onChange={handleHowManyQues}/> <br/> <br/>
      <button onClick={addNewResultSheet}>Add New Result Sheet</button>
    </div>
  );
}

export default ResultSheetUpload;