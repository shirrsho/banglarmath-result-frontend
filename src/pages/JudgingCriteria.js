import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

const TagRow = ( {addCriteria} ) => {

    const [segment, setSegment] = useState();
    const [type, setType] = useState();
    const [furnishThreshold, setFurnishThreshold] = useState();
    const [learnThreshold, setLearnThreshold] = useState();

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

    const addcriteria = (e) => {
        e.preventDefault()
        let criteria = {
            segment: segment?.value,
            type: type?.value,
            furnishThreshold: furnishThreshold,
            learnThreshold: learnThreshold
        }
        // console.log(tag);
        addCriteria(criteria);
    }

    const handleSegmentChange = (segment) => {
        setSegment(segment);
    }
    const handleTypeChange = (type) => {
        setType(type);
    }
    const handleFurnishChange = (event) => {
        setFurnishThreshold(event.target.value);
    }
    const handleLearnChange = (event) => {
        setLearnThreshold(event.target.value);
    }

    return (
        <div>
            <span style={{"display":"flex"}}>
                <Select
                    options={segmentoptions}
                    value={segment}
                    onChange={handleSegmentChange} />
                <Select
                    options={typeoptions}
                    value={type}
                    onChange={handleTypeChange} />
                <input type='number' placeholder='Threshold (Furnish)' onChange={handleFurnishChange}/>
                <input type='number' placeholder='Threshold (Learn)' onChange={handleLearnChange}/>
                <button onClick={(e) => addcriteria(e)}>Set</button>
            </span>
        </div>
    );
}

function JudgingCriteria() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [examcode, setExamcode] = useState()
    const [exams, setExams] = useState([]);

    const getExams = async () => {
        let texams = []

        await axios.get(`http://localhost:3001/exams`)
        .then((response) => {
            // Check if the request was successful.
            if (response.status === 200) {
                // console.log(response.data)
                const data = response.data;
                data.infos.forEach(element => {
                    texams.push({
                        value:element.examcode,
                        label:element.examcode+'-'+element.examname
                    })
                });
                setExams(texams);
            } else {
                // Display an error message.
                console.log("Error: " + response.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const uploadCriterias = async () => {
        console.log(criterias);
        await axios.post('http://localhost:3001/uploadjudgingcriteria/', {criterias, examcode})
            .then((response) => {
            // setJsonData(results);
            console.log('Post successful! ', response.data);
                navigate('/')
            })
            .catch((error) => {
            console.log('Post failed!');
            });
    }

    const addCriteria = (newTag) => {
        // const updatedTags = tags.filter((tag) => tag.id !== newTag.id); // Remove the tag with the same id
        const newTags = [...criterias, newTag]; // Append the new tag
        // const newTags = tags;
        // let ind = "Q"+newTag.id;
        // newTags[ind] = {...newTag};
        setCriterias(newTags); // Update the tags state

        // console.log(tags);
    }

    const setexamcode = (code) => {
        setExamcode(code.value)
    }

    useEffect(()=>{
        setRows([...rows, rows.length+1]);
    },[criterias])

    useEffect(()=>{
        getExams()
    },[]);

    return (
        <div>
            <Select
                options={exams}
                onChange={setexamcode}
            />
            {rows?.map((row) => {
                return <TagRow key={row} addCriteria={addCriteria}/>
            })}
            <button onClick={uploadCriterias}>Set Judging Criterias</button>
        </div>
    );
}

export default JudgingCriteria;
