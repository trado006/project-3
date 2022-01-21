import { useState, useEffect } from "react";

import { Tree, Dropdown, message } from 'antd';
import { Menu } from 'antd';
import {
    DownOutlined,
    CarryOutOutlined,
    FileImageOutlined,
    FileUnknownOutlined,
} from '@ant-design/icons';

import DeleteCourseModal from './DeleteCourseModal';
import AddCourseModal from './AddCourseModal';
import UpdateCourseModal from './UpdateCourseModal';

import API from '../../util/api';
import './style.css';

var courseId = 0;
var courses = [];
export default function App({className, style, selectedCourseId, setSelectedCourseId}){
    const [courseTreeData, setCourseTreeData] = useState([]);
    const [isDeleteCourseModalVisible, setIsDeleteCourseModalVisible] = useState(false);
    const [isUpdateCourseModalVisible, setIsUpdateCourseModalVisible] = useState(false);
    const [isAddCourseModalVisible, setIsAddCourseModalVisible] = useState(false);

    useEffect(()=>{
        API.get('/my-course-tree')
        .then(function (res) {
            switch (res.data["error_code"]) {
                case 0:
                    courses = res.data.courses;
                    console.log(courses);
                    setCourseTreeData(getCourseTreeData(courses));
                    break;
                case 2:
                    message.warning(res.data.msg);
                    break;
            }
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });
    }, []);

    const getCourseTreeData = (courses) => {
        var treeData = [];
        courses.forEach( (item) => {
            var course = {
                title: (
                    <Dropdown
                        overlay={ CourseMenuContext(item.id) }
                        onContextMenu={event=>event.stopPropagation()}
                        trigger={['contextMenu']}
                    >
                        <div>
                            <i className="fa fa-book" /> {item.name}
                        </div>
                    </Dropdown>
                ),
                key: 'C-'+item.id,
                // icon: <i className="fa fa-book" />,
            };
            treeData.push(course);
        });
        return treeData;
    }

    const onSelected = (selectedKeys) => {
        setSelectedCourseId(selectedKeys[0]);
    }

    const CourseMenuContext = (id) => {
        return (
            <Menu onClick={(event) => {event.domEvent.stopPropagation()}}>
                <Menu.Item key="1">
                    <a onClick={()=>{ setSelectedCourseId(''); courseId = id; setIsUpdateCourseModalVisible(true); }}>
                        Update course
                    </a>
                </Menu.Item>
                <Menu.Item key="2">
                    <a onClick={()=>{ setSelectedCourseId(''); courseId = id; setIsDeleteCourseModalVisible(true); }}>
                        Delete course
                    </a>
                </Menu.Item>
            </Menu>
        )
    }

    const AddCourseContext = () => {
        return (
            <Menu onClick={(event) => {event.domEvent.stopPropagation()}}>
                <Menu.Item key="1">
                    <a onClick={()=>{ setIsAddCourseModalVisible(true); }}>
                        Add course
                    </a>
                </Menu.Item>
            </Menu>
        )
    }

    const addCourse = (course)=>{
        courses.push(course);
        setCourseTreeData(getCourseTreeData(courses));
        if(selectedCourseId)
            setSelectedCourseId(`C-${course.id}`);
    }

    const updateCourse = (course)=>{
        courses = courses.map((item)=>{
            if(item.id!=course.id) return item;
            else return course;
        });
        setCourseTreeData(getCourseTreeData(courses));
        if(selectedCourseId=='')
            setSelectedCourseId(`C-${courseId}`);
    }

    const deleteCourse = ()=>{
        if(selectedCourseId==`C-${courseId}`)
                setSelectedCourseId('');
        courses.forEach((item, index) => {
            if(item.id==courseId){
                courses.splice(index,1);
                setCourseTreeData(getCourseTreeData(courses));
            }
        });
    }

    return (
        <>
            {isDeleteCourseModalVisible &&
                <DeleteCourseModal
                    courseId={courseId}
                    deleteCourse={deleteCourse}
                    setIsModalVisible={setIsDeleteCourseModalVisible}
                />
            }
            {isAddCourseModalVisible &&
                <AddCourseModal
                    addCourse={addCourse}
                    setIsModalVisible={setIsAddCourseModalVisible}
                />
            }
            {isUpdateCourseModalVisible &&
                <UpdateCourseModal
                    courseId={courseId}
                    updateCourse={updateCourse}
                    setIsModalVisible={setIsUpdateCourseModalVisible}
                />
            }
            <Dropdown overlay={ AddCourseContext() } trigger={['contextMenu']}>
                <Tree
                    className={className}
                    style={style?style:''}
                    showLine={{showLeafIcon: false}}
                    defaultExpandAll
                    switcherIcon={<DownOutlined />}
                    selectedKeys={[selectedCourseId]}
                    onSelect={onSelected}
                    treeData={courseTreeData}
                />
            </Dropdown>
        </>
    )
}