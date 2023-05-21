import { useState } from "react";
import ResultSheetUpload from "../components/ResultSheetUpload";
import TagQuestions from "../components/TagQuestions";
import AdminConfirmation from "./AdminConfirmation";

function AdminPage(){

    const [examinformation, setExaminformation] = useState({});

    return (
        <div className="adminpage">
            <ResultSheetUpload setExaminformation={setExaminformation} />
            <TagQuestions examinformation={examinformation} setExaminformation={setExaminformation}/>
            <AdminConfirmation examinformation={examinformation}/>
        </div>
    )
}

export default AdminPage;