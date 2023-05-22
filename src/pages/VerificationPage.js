import AdminPage from "./AdminPage";
import { useState } from "react";

function VerificationPage(){
    const [verified, setVerified] = useState(false);

    const handlename = (event) => {
        event.preventDefault();
        if(event.target.value==="Shirsho")
            setVerified(true);
    }
    return (
        <>
        { verified === false?
            <div>
                <label>Say My Name: </label><input type="text" onChange={handlename}/>
            </div>
            :
            <AdminPage/>
        }
        </>
    )
}

export default VerificationPage;