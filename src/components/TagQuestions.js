import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const TagRow = ({ id, addTag }) => {

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
            segments: segments.map(segment => segment.value),
            types: types.map(type => type.value)
        }
        // console.log(tag);
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
            <span style={{"display":"flex"}}>
                <p>Question {id}: </p>
                <Select
                    id={id}
                    // placeholder={tags?.filter(tag=>tag.id===id).segments?.toString()||"Add Segments"}
                    isMulti
                    options={segmentoptions}
                    value={segments}
                    onChange={handleSegmentsChange} />
                <Select
                    id={id}
                    // placeholder={tags?.filter(tag=>tag.id===id).types?.toString()||"Add Types"}
                    isMulti
                    options={typeoptions}
                    value={types}
                    onChange={handleTypesChange} />
                <button onClick={(e) => tagAdded(e)}>Set</button>
            </span>
        </div>
    );
}

function TagQuestions({ examinformation, setExaminformation }) {
    const [rows, setRows] = useState([]);
    const [tags, setTags] = useState([]);

    const uploadTags = async () => {
        // console.log("sending: ",tags);
        let e = examinformation;
        e.tags = tags;
        setExaminformation(e);
    }

    const addTag = (newTag) => {
        const updatedTags = tags.filter((tag) => tag.id !== newTag.id); // Remove the tag with the same id
        const newTags = [...updatedTags, newTag]; // Append the new tag
        // const newTags = tags;
        // let ind = "Q"+newTag.id;
        // newTags[ind] = {...newTag};
        setTags(newTags); // Update the tags state

        // console.log(tags);
    }

    useEffect(() => {
        let temp = [];
        for (let i = 0; i < examinformation.nques; i++) {
            temp.push(i + 1);
        }
        setRows(temp);
    }, [examinformation.nques])

    return (
        <>
            {
                examinformation?.nques > 0 ? <div>
                    {rows?.map((row) => {
                        return <TagRow id={row} key={row} addTag={addTag} />
                    })}
                    <button onClick={uploadTags}>Confirm Tags</button>
                </div>
                    :
                <></>
            }
        </>
    );
}

export default TagQuestions;
