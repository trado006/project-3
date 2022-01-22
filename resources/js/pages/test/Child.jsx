import { useEffect } from "react"


export default function App({ stringWraper }){
    console.log(stringWraper[0])
    return (
        <p>{stringWraper[0]}</p>
    )
}