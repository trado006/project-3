import { useState, useEffect, useRef } from "react";
import { message } from "antd";

import LectureView from './LectureView'

export default function LectureViewWrapper({idObj}){
    var lectureId = idObj.value;
    const [lecture, setLecture] = useState({
        id: 0,
        name: '',
        video_url: '',
        description: '',
    });

    useEffect( ()=>{
        axios.get(`/lecture/${lectureId}`)
        .then(function (res) {
            if(res.data.error_code){
                console.log(res.data);
                message.error("Request error: view detail in console");
                return;
            }
            setLecture(res.data.lecture);
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });
    }, [lectureId]);

    return (
        <LectureView lecture={lecture} />
    );
};