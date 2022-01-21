import { useEffect, useRef } from "react";

export default function App({test}) {
    const testDescriptionArea = useRef();
    
    useEffect(()=>{
        if(test.description){
            testDescriptionArea.current.value = test.description;
            textAreaAdjust(testDescriptionArea.current);
        }
    }, [test]);

    const textAreaAdjust = (element) => {
        element.style.height = "1px";
        element.style.height = (element.scrollHeight)+"px";
    }

    return (
        <div>
            <h2>{test.name}</h2>
            {test.description &&
                <textarea ref={testDescriptionArea} className="d-block w-100" disabled-custom="true" disabled></textarea>
            }
        </div>
    )
}