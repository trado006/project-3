import { useState, useEffect, useRef } from "react";

export default function App({lecture}){
    const lectureDescriptionArea = useRef(); 

    useEffect(()=>{
        lectureDescriptionArea.current.value = lecture.description;
        textAreaAdjust(lectureDescriptionArea.current);
    }, [lecture]);

    const textAreaAdjust = (element) => {
        element.style.height = "1px";
        element.style.height = (element.scrollHeight)+"px";
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <iframe height="360" width="640" src={lecture.video_url} frameBorder="1" allowFullScreen></iframe>
            </div>
            <div className="d-flex justify-content-center">
                <div style={{width: '640px'}}>
                    <h2>{lecture.name}</h2>
                    <textarea ref={lectureDescriptionArea} className="d-block w-100" disabled-custom="true" disabled></textarea>
                </div>
            </div>
        </div>
    );
};