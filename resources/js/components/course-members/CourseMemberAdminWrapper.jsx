import { useEffect, useState } from 'react';

import { message } from 'antd';

import CourseMemberTables from './CourseMemberTables';

export default function CourseMemberAminWrapper({courseId}){
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

    const addStudent = (student) => {
        let array = [...students];
        array.unshift(student);
        setStudents(array);
    }

    const addTeacher = (teacher) => {
        let array = [...teachers];
        array.unshift(teacher);
        setTeachers(array);
    }

    const deleteMember = (record) => {
        if(record.position=='student')
        deleteStudent(record.id);
        if(record.position=='teacher')
        deleteTeacher(record.id);
    }

    const deleteStudent = (studentId) => {
        API.delete(`course/${courseId}/delete-student/${studentId}`)
        .then((res)=>{
            if(res.data.error_code){
                console.log(res.data);
                message.error('Request error: view more in console');
            }
            setStudents(students.filter((item)=>{
                return item.id != studentId;
            }));
            message.success("Delete student is okey");
        }).catch((err)=>{
            console.log(err);
            message.error('Request error: view more in console');
        })
    }

    const deleteTeacher = (teacherId) => {
        API.delete(`course/${courseId}/delete-teacher/${teacherId}`)
        .then((res)=>{
            if(res.data.error_code){
                console.log(res.data);
                message.error('Request error: view more in console');
            }
            setTeachers(teachers.filter((item)=>{
                return item.id != teacherId;
            }))
        })
        .catch((err)=>{
            console.log(err);
            message.error('Request error: view more in console');
        })
    }

    return (
        <CourseMemberTables courseId={courseId} students={students} teachers={teachers}
            addStudent={addStudent} addTeacher={addTeacher} deleteMember={deleteMember} />
    )
}