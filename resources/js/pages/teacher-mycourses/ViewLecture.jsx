import { useState, useEffect, useRef } from "react";
import { message } from "antd";

import LectureDetail from '../../components/leture-detail/LectureDetail'

export default function App({selectedItem}){
    var lectureId = selectedItem.id;
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
        <div className="d-flex flex-column align-items-center">
            <div className="mb-5" style={{width: '640px'}}>
                <LectureDetail lecture={lecture} />
            </div>
        </div>
    );
};