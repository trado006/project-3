import { useEffect } from "react"


export default function B({b}){
    useEffect(()=>{
        console.log('render b');
    }, [b]);
    return <p>Helo</p>
}