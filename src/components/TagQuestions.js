import React, { useState } from 'react';

function TagQuestions( {setN_ques, tags, setTags} ) {
    const [rows, setRows] = useState([]);
    
    const setNumberofQuestions = (value) => {
        setN_ques(value);
        let temp = [];
        for (let i = 0; i < value; i++) {
            temp.push(i+1);
        }
        setRows(temp);
    }

    // const selectSegment = (e, id, value) => {
    //     e.preventDefault();
    //     tags.forEach(element => {
    //         if(element.id === id){
    //             console.log(element);
    //             element = {...element, segment:value};
    //             setTags(tags);
    //             return;
    //         }
    //     });
    //     tags.push({
    //         id:id,
    //         segment:value
    //     })
    //     setTags(tags);
    // }

    // const selectType = (id, value) => {
    //     tags.forEach(element => {
    //         if(element.id === id){
    //             element = {...element, type:value};
    //             setTags(tags);
    //             return;
    //         }
    //     });
    //     tags.push({
    //         id:id,
    //         type:value
    //     })
    //     setTags(tags);
    // }

    const addTag = (newTag) => {
        const updatedTags = tags.filter((tag) => tag.id !== newTag.id); // Remove the tag with the same id
        const newTags = [...updatedTags, newTag]; // Append the new tag
        setTags(newTags); // Update the tags state
    }

    const TagRow = ({id}) => {

        const [segment, setSegment] = useState();
        const [type, setType] = useState();

        const tagAdded = (e) => {
            e.preventDefault()
            let tag ={
                id:id,
                segment:segment,
                type:type
            }
            addTag(tag);
        }

        return(
            <div key={id}>
                <h3>Question {id}: </h3>
                <span>
                    <select id={id} name='segment' onChange={(e)=>setSegment(e.target.value)}>
                        <option value="Segment Not Specified">Segment Not Specified</option>
                        <option value="THEORITICAL KNOWLEDGE">THEORITICAL KNOWLEDGE</option>
                        <option value="APPLICATION">APPLICATION</option>
                        <option value="OTHERS">OTHERS</option>
                    </select>
                    <select id={id} name='type' onChange={(e)=>setType(e.target.value)}>
                        <option value="Type Not Specified">Type Not Specified</option>
                        <option value="Number">Number</option>
                        <option value="Algebra">Algebra</option>
                        <option value="Counting">Counting</option>
                        <option value="Geometry">Geometry</option>
                        <option value="Calculation">Calculation</option>
                        <option value="Ability to understand questions">Ability to understand questions</option>
                    </select>
                    <button onClick={(e)=>tagAdded(e)}>Set</button>
                </span>
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
