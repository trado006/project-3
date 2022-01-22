import A from './A'
import { useEffect, useState } from 'react';

export default function name(params) {
    const [a, setA] = useState({});
    useEffect(()=>{
        setInterval(()=>{
            setA({});
            console.log("hello");
        }, 2000);
    }, []);
    return (
        <A a={a} />
    )
}