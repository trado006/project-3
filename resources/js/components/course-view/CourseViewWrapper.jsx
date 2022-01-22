import { useState, useEffect } from "react";
import { message } from "antd";

import CourseView from './CourseView';

export default function ViewCourseWrapper({idObj}){
    var courseId = idObj.value;
    const [course, setCourse] = useState({
        id: 0,
        name: 'course name',
        code: 'course code',
        price: 0,
        description: 'course description',
    });

    useEffect( ()=>{
        axios.get(`/course/${courseId}`)
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
        <CourseView course={course} />
    );
};