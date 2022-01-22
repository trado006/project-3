import { useEffect, useState } from 'react';
import { message } from 'antd';

import CourseMemberTables from './CourseMemberTables';

export default function CourseMemberTeacherWrapper({courseId}){
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(()=>{
        axios.get(`/course/${courseId}/members`)
        .then((res)=>{
            if(res.data.error_code){
                console.log(res.data);
                message.error("Request error: view detail in console");
                return;
            }
            let students = res.data.students;
            let teachers = res.data.teachers;
            setStudents(students);
            setTeachers(teachers);
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });
    }, [courseId]);

    return (
        <CourseMemberTables courseId={courseId} students={students} teachers={teachers} />
    )
}