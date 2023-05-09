import React, { useState } from 'react';
import CSVtoJSON from './components/ResultSheetUpload';
import TagQuestions from './components/TagQuestions';
import Export from './components/Export';

function App() {
  const [resultsheet,setResultsheet] = useState();
  const [n_ques, setN_ques] = useState(0);

  return (
    <div>
      <h1>Banglarmath Result Sheet Generator</h1>
      <p>Number of questions: {n_ques}</p>
      <CSVtoJSON setResultsheet={setResultsheet}/>
      {resultsheet && <TagQuestions setN_ques={setN_ques}/>}
      <div style={{height:"100px"}}></div>
      {n_ques!==0 && <Export resultsheet={resultsheet} n_ques={n_ques}/>}
    </div>
  );
}

export default App;