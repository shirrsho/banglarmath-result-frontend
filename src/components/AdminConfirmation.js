import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminConfirmation({examinformation}){

    const navigate = useNavigate();

    const upload = async () => {
        console.log(examinformation);
        await axios.post('http://localhost:3001/uploadresultsheet/', examinformation)
            .then((response) => {
            // setJsonData(results);
            console.log('Post successful! ', response.data);
                navigate('/admin/judgingcriterias')
            })
            .catch((error) => {
            console.log('Post failed!');
            });
    }

    return(
        <>
        { examinformation?.nques!==0 ?
        <div>
            <button onClick={upload}>Upload</button>
        </div>
        :
        <></>
        }
        </>
    )
}

export default AdminConfirmation;