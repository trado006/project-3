import { useState, useEffect } from "react";
import { message } from "antd";
import API from '../../util/api';

import CourseView from '../../components/course-view/CourseView';

export default function ViewCourse({selectedItem}){
    var courseId = selectedItem.id;
    const [course, setCourse] = useState({
        id: 0,
        name: 'course name',
        code: 'course code',
        price: 0,
        description: 'course description',
    });

    useEffect( ()=>{
        API.get(`/course/${courseId}`)
        .then(function (res) {
            if(res.data.error_code){
                console.log(res.data);
                message.error("Request error: view detail in console");
                return;
            }
            setCourse(res.data.course);
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });
    }, [courseId]);

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="mb-5" style={{width: '640px'}}>
                <CourseView course={course} />
            </div>
        </div>
    );
};