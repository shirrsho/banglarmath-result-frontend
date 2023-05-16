import React, { useState } from 'react';
import CSVtoJSON from './components/ResultSheetUpload';
import TagQuestions from './components/TagQuestions';
import Export from './components/Export';

function App() {
  const [resultsheet,setResultsheet] = useState();
  const [n_ques, setN_ques] = useState(0);
  const [tags, setTags] = useState();

  return (
    <div>
      <h1>Banglarmath Result Sheet Generator</h1>
      <p>Number of questions: {n_ques}</p>
      <CSVtoJSON setResultsheet={setResultsheet}/>
      {resultsheet && <TagQuestions setN_ques={setN_ques} tags={tags} setTags={setTags}/>}
      <div style={{height:"100px"}}></div>
      {/* {tags?.map((tag) => {
                return <h1 key={tag.id}>{tag.id} {tag.segments} {tag.types}</h1>
            })} */}
      <Export resultsheet={resultsheet} tags={tags} n_ques={n_ques}/>
    </div>
  );
}

export default App;