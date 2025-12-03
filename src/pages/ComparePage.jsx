import { useParams } from "react-router-dom"

export default function ComparePage(){
    const {id1, id2} = useParams()
    return(
        <>
            <h1>Compare page</h1>
            <p>{`id1: ${id1} --- id2: ${id2}`}</p>
        </>
    )
}