import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

function ResultSheetUpload({ setResultsheet }) {
  const [file, setFile] = useState();
  const [jsonData, setJsonData] = useState();

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  }

  const convertToJSON = () => {
    if (file == null) return;
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        console.log(results.data);
        uploadResultSheet(results.data)
        setResultsheet(results.data);
      }
    });
  }

  const uploadResultSheet = async (results) => {
    // if (file == null) return;
    // else convertToJSON();
    // console.log(jsonData);
    await axios.post('http://localhost:3001/uploadresultsheet/', results)
        .then((response) => {
          setJsonData(results);
          console.log('Post successful! ', response.data);
        })
        .catch((error) => {
          console.log('Post failed!');
        });
  }

  // const uploadQuesInfo = () => {
  //   if (file == null) return;
  //   else convertToJSON();
  //   axios.post('http://localhost:3001/uploadquestioninfo/', jsonData)
  //       .then((response) => {
  //         console.log('Post successful! ', response.data);
  //       })
  //       .catch((error) => {
  //         console.log('Post failed!');
  //       });
  // }

  return (
    <div>
      <h3>Upload the result sheet in csv. Must be in the standard format.</h3>
      <input type='file' onChange={handleFileUpload} />
      <button onClick={convertToJSON}>Upload</button>
      {/* <h3>Upload the questions' information in csv. Must be in the standard format.</h3>
      <input type='file' onChange={handleFileUpload} />
      <button onClick={uploadQuesInfo}>Upload</button> */}
      {jsonData && <p>Successfully Uploaded.</p>}
    </div>
  );
}

export default ResultSheetUpload;