function Resultsheet({ studentresultsheet }) {
    /*
        studentresultsheet = {
            studentId:
            studentName:
            school:
            medium:
            class:
            answers:[]
            assesments:[{
                type:
                segment:
                status:
            }]
        }
    */

    return(
        <div className="studentresultsheet">
            <p>{studentresultsheet?.studentId}</p>
            <p>{studentresultsheet?.studentName}</p>
            <p>{studentresultsheet?.school}</p>
            <p>{studentresultsheet?.class}</p>
            {studentresultsheet?.answers?.map(ans=>{
                return <p>{ans?.Question} {ans?.YourAnswer}</p>
            })}
            <br/>
            {studentresultsheet?.assesments?.map(assesment=>{
                return <p>{assesment?.segment} {assesment?.type} {assesment?.status}</p>
            })}
        </div>
    );
}

export default Resultsheet;