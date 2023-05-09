import React, { useState } from 'react';
import Papa from 'papaparse';

function ResultSheetUpload( {setResultsheet} ) {
  let file;
  const [jsonData,setJsonData] = useState();

  const handleFileUpload = (event) => {
    file = event.target.files[0];
  }

  const convertToJSON = () => {
    if(file==null)return;
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          console.log(results.data);
          setJsonData(results.data);
          setResultsheet(results.data);
        }
      });
  }

    return (
      <div>
        <h3>Upload the result Sheet in csv. Must be in the standard format.</h3>
        <input type='file' onChange={handleFileUpload} />
        <button onClick={convertToJSON}>Upload</button>
        {jsonData && <p>Successfully Uploaded.</p>}
      </div>
    );
}

export default ResultSheetUpload;
