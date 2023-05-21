import axios from "axios";

function AdminConfirmation({examinformation}){

    const upload = async () => {
        console.log(examinformation);
        await axios.post('http://localhost:3001/uploadresultsheet/', examinformation)
            .then((response) => {
            // setJsonData(results);
            console.log('Post successful! ', response.data);
            })
            .catch((error) => {
            console.log('Post failed!');
            });
    }

    return(
        <div>
            <button onClick={upload}>Confirm</button>
        </div>
    )
}

export default AdminConfirmation;