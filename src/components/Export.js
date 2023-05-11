import React, { useState } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

function Export( {resultsheet, tags} ) {

    const [student_id, setStudent_id] = useState();
    // let finalresult = [];

    // result = {
    //     Question No:
    //     Question Type:
    //     Correct Answer:
    //     Your Answer:
    // }

    const calculateRightPercentage = (qnum) => {
        let rights = 0;
        let total = 0;
        resultsheet.forEach(result => {
            if(result[qnum]==="Right Answer"){
                rights++;
            }
            if(result[qnum]!=="Absent"){
                total++;
            }
        });
        return (rights/total)*100;
    }

    const calculateBlankPercentage = (qnum) => {
        let blanks = 0;
        let total = 0;
        resultsheet.forEach(result => {
            if(result[qnum]==="Did not Attempt"){
                blanks++;
            }
            if(result[qnum]!=="Absent"){
                total++;
            }
        });
        return (blanks/total)*100;
    }

    const exportCsv = () => {
        let newresult = []

        for(let i = 1 ; i <= tags.length ; i++){
            let qnum = "Q"+i;
            newresult.push({
                Question: qnum,
                QuestionType: tags.find((tag)=>tag.id===i).type,
                YourAnswer: resultsheet.find((result)=>result.Id===student_id)[qnum],
                Correct: calculateRightPercentage(qnum),
                Wrong: 100-calculateRightPercentage(qnum),
                Blank:calculateBlankPercentage(qnum)
            })
        }
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
