import React, { useState } from 'react';

function TagQuestions( {setN_ques} ) {
    const [rows, setRows] = useState([]);
    const setNumberofQuestions = (value) => {
        setN_ques(value)
        let temp = [];
        for (let i = 0; i < value; i++) {
            temp.push(i+1);
        }
        setRows(temp);
    }

    const TagRow = ({id}) => {
        return(
            <div key={id}>
                <label>Question {id}: </label>
                <select id={id} name='segment'>
                    <option value="Segment Not Specified">Segment Not Specified</option>
                    <option value="THEORITICAL KNOWLEDGE">THEORITICAL KNOWLEDGE</option>
                    <option value="APPLICATION">APPLICATION</option>
                    <option value="OTHERS">OTHERS</option>
                </select>
                <select id={id} name='type'>
                    <option value="Type Not Specified">Type Not Specified</option>
                    <option value="Number">Number</option>
                    <option value="Algebra">Algebra</option>
                    <option value="Counting">Counting</option>
                    <option value="Geometry">Geometry</option>
                    <option value="Calculation">Calculation</option>
                    <option value="Ability to understand questions">Ability to understand questions</option>
                </select>
            </div>
        );
    }

    return (
        <div>
            <input type='number' onChange={(e)=>setNumberofQuestions(e.target.value)}/>
            <h4>Tag the questions:</h4>
            {rows.map((row) => {
                return <TagRow id={row} key={row}/>
            })}
        </div>
    );
}

export default TagQuestions;
