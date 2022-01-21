import { Table, Modal, Space, Popconfirm, message, Button } from 'antd';
import { useEffect, useState } from 'react';
import API from '../../util/api';

import AddMemberModal from './AddMemberModal';

export default function App({courseId}){
    const [students, setStudents] = useState();
    const [teachers, setTeachers] = useState();
    const [ isAddStudentModalVisible, setIsAddStudentModalVisible ] = useState(false);
    const [ isAddTeacherModalVisible, setIsAddTeacherModalVisible ] = useState(false);
    const [ isRemoveMemberModalVisible, setIsRemoveMemberModalVisible ] = useState(false);

    const columns = [
        {
            title: 'Login name',
            dataIndex: 'login_name',
        },
        {
            title: 'Full name',
            dataIndex: 'full_name',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
        },
        {
          title: 'Birthday',
          dataIndex: 'birthday',
        },
        {
          title: 'Delete',
          key: 'delete',
          render: (record) => (
            <Space size="middle">
                <Popconfirm
                    title="Are you sure to delete this?"
                    onConfirm={()=>deleteMember(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <a className="text-danger">Delete</a>
                </Popconfirm>
            </Space>
          ),
        },
    ];

    useEffect(()=>{
        API.get(`/course/${courseId}/members`)
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

    const getRowKey = (record) => {
        return record.id;
    }

    const addStudent = (login_name) => {
        API.post(`course/${courseId}/add-student/${login_name}`)
        .then((res)=>{
            if(res.data.error_code){
                message.error(res.data.msg);
                return;
            }
            let array = [...students];
            array.unshift(res.data.student);
            setStudents(array);
        })
        .catch((err)=>{
            message.error('Request error: view detail in console');
            console.log(err);
        })
    }

    const addTeacher = (login_name) => {
        API.post(`course/${courseId}/add-teacher/${login_name}`)
        .then((res)=>{
            if(res.data.error_code){
                message.error(res.data.msg);
                return;
            }
            let array = [...teachers];
            array.unshift(res.data.teacher);
            setTeachers(array);
        })
        .catch((err)=>{
            console.log(err);
        });
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
        <div>
            <Button
                className="mb-3 mt-5"
                onClick={()=>setIsAddStudentModalVisible(true)}
                type="primary"
            >
            Add student
            </Button>
            {isAddStudentModalVisible &&
                <AddMemberModal
                    position="student"
                    addMember={addStudent}
                    setIsModalVisible={setIsAddStudentModalVisible}
                />
            }
            <Table columns={columns} rowKey={getRowKey} bordered={true} dataSource={students} />
            <Button
                className="mb-3 mt-5"
                onClick={()=>setIsAddTeacherModalVisible(true)}
                type="primary"
            >
            Add teacher
            </Button>
            {isAddTeacherModalVisible &&
                <AddMemberModal
                    position="teacher"
                    addMember={addTeacher}
                    setIsModalVisible={setIsAddTeacherModalVisible}
                />
            }
            <Table columns={columns} rowKey={getRowKey} bordered={true} dataSource={teachers} />
        </div>
    )
}