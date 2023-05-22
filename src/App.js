import React from 'react';
import Portal from './pages/Portal';
import { HashRouter, Routes, Route } from 'react-router-dom';
import JudgingCriteria from './pages/JudgingCriteria';
import VerificationPage from './pages/VerificationPage';

function App() {
  // const [resultsheet,setResultsheet] = useState();
  // const [n_ques, setN_ques] = useState(0);
  // const [tags, setTags] = useState();

  return (
    <HashRouter>
        <Routes>
          <Route path="/" element={<Portal />} />
          <Route path="/admin" element={<VerificationPage />} />
          <Route path="/admin/judgingcriterias" element={<JudgingCriteria />} />
        </Routes>
      </HashRouter>
    // <div>
    //   <h1>Banglarmath Result Sheet Generator</h1>
    //   <p>Number of questions: {n_ques}</p>
    //   <CSVtoJSON setResultsheet={setResultsheet}/>
    //   {resultsheet && <TagQuestions setN_ques={setN_ques} tags={tags} setTags={setTags}/>}
    //   <div style={{height:"100px"}}></div>
    //   {/* {tags?.map((tag) => {
    //             return <h1 key={tag.id}>{tag.id} {tag.segments} {tag.types}</h1>
    //         })} */}
    //   <Export resultsheet={resultsheet} tags={tags} n_ques={n_ques}/>
    // </div>
  );
}

export default App;