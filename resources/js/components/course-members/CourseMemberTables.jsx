import { Table, Space, Popconfirm, message, Button } from 'antd';
import { useEffect, useState } from 'react';

import AddCourseStudentModal from './AddCourseStudentModal';
import AddCourseTeacherModal from './AddCourseTeacherModal';

export default function CourseMemberTables({ courseId, students, teachers,
                                            addStudent, addTeacher, deleteMember }){
    const [ isAddStudentModalVisible, setIsAddStudentModalVisible ] = useState(false);
    const [ isAddTeacherModalVisible, setIsAddTeacherModalVisible ] = useState(false);

    const infoCols = [
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
    ]

    const actionCols = [
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
    ]

    const getRowKey = (record) => {
        return record.id;
    }

    return (
        <div>
            {
                isAddStudentModalVisible &&
                <AddCourseStudentModal
                    courseId={courseId}
                    onAddMemberDone={addStudent}
                    onHileModal={()=>setIsAddStudentModalVisible(false)}
                />
            }
            {
                addStudent &&
                <Button
                    className="mb-3"
                    onClick={()=>setIsAddStudentModalVisible(true)}
                    type="primary"
                >
                    Add student
                </Button>
            }
            <Table class="mb-5" columns={deleteMember? [...infoCols,...actionCols]: infoCols}
                rowKey={getRowKey} bordered={true} dataSource={students} />

            {isAddTeacherModalVisible &&
                <AddCourseTeacherModal
                    courseId={courseId}
                    onAddMemberDone={addTeacher}
                    onHileModal={()=>setIsAddTeacherModalVisible(false)}
                />
            }
            {
                addTeacher &&
                <Button
                    className="mb-3"
                    onClick={()=>setIsAddTeacherModalVisible(true)}
                    type="primary"
                >
                Add teacher
                </Button>
            }
            <Table columns={deleteMember? [...infoCols,...actionCols]: infoCols}
                rowKey={getRowKey} bordered={true} dataSource={teachers} />
        </div>
    )
}