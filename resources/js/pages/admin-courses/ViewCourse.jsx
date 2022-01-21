import { useState, useEffect } from "react";
import { message } from "antd";
import API from '../../util/api';

import CourseDetail from '../../components/course-detail/CourseDetail'

export default function ViewCourse({courseId}){
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
        <CourseDetail course={course} />
    );
};