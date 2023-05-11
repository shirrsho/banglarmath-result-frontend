import React, { useState } from 'react';
import Select from 'react-select';

function TagQuestions({ setN_ques, tags, setTags }) {
    const [rows, setRows] = useState([]);

    const setNumberofQuestions = (value) => {
        setN_ques(value);
        let temp = [];
        for (let i = 0; i < value; i++) {
            temp.push(i + 1);
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

    const TagRow = ({ id }) => {

        const [segments, setSegments] = useState([]);
        const [types, setTypes] = useState([]);

        const segmentoptions = [
            { value: 'THEORITICAL KNOWLEDGE', label: 'THEORITICAL KNOWLEDGE' },
            { value: 'APPLICATION', label: 'APPLICATION' },
            { value: 'OTHERS', label: 'OTHERS' }
        ]
        const typeoptions = [
            { value: 'Number', label: 'Number' },
            { value: 'Algebra', label: 'Algebra' },
            { value: 'Counting', label: 'Counting' },
            { value: 'Geometry', label: 'Geometry' },
            { value: 'Calculation', label: 'Calculation' },
            { value: 'Ability to understand questions', label: 'Ability to understand questions' },
        ]

        const tagAdded = (e) => {
            e.preventDefault()
            let tag = {
                id: id,
                segments: segments.map(segment=>segment.value),
                types: types.map(type=>type.value)
            }
            console.log(tag);
            addTag(tag);
        }

        const handleSegmentsChange = (segments) => {
            setSegments(segments);
        }
        const handleTypesChange = (types) => {
            setTypes(types);
        }

        return (
            <div key={id}>
                <h3>Question {id}: </h3>
                <span>
                    <Select
                        id={id}
                        placeholder={tags.filter(tag=>tag.id===id).segments?.toString()||"Add Segments"}
                        isMulti
                        options={segmentoptions}
                        value={segments}
                        onChange={handleSegmentsChange} />
                    <Select
                        id={id}
                        placeholder={tags.filter(tag=>tag.id===id).types?.toString()||"Add Types"}
                        isMulti
                        options={typeoptions}
                        value={types}
                        onChange={handleTypesChange} />
                    <button onClick={(e) => tagAdded(e)}>Set</button>
                </span>
            </div>
        );
    }

    return (
        <div>
            <input type='number' onChange={(e) => setNumberofQuestions(e.target.value)} />
            <h4>Tag the questions:</h4>
            {rows.map((row) => {
                return <TagRow id={row} key={row} />
            })}
        </div>
    );
}

export default TagQuestions;
