import { useState, useEffect } from "react";

import { message } from 'antd';
import DeleteCourseModal from './DeleteCourseModal';
import AddCourseModal from './AddCourseModal';
import UpdateCourseModal from './UpdateCourseModal';

import CourseTreeView from "../../components/course-tree/CourseTreeView";


var courseId = 0;
var courses = [];
export default function App({ selectedKey, onSelected }){
    const [courseTreeData, setCourseTreeData] = useState([]);
    const [isDeleteCourseModalVisible, setIsDeleteCourseModalVisible] = useState(false);
    const [isUpdateCourseModalVisible, setIsUpdateCourseModalVisible] = useState(false);
    const [isAddCourseModalVisible, setIsAddCourseModalVisible] = useState(false);

    useEffect(()=>{
        axios.get('/my-course-tree')
        .then(function (res) {
            switch (res.data["error_code"]) {
                case 0:
                    courses = res.data.courses;
                    setCourseTreeData([...courses]);
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
            {isDeleteCourseModalVisible &&
                <DeleteCourseModal
                    courseId={courseId}
                    deleteCourse={deleteCourse}
                    setIsModalVisible={setIsDeleteCourseModalVisible}
                />
            }
            <CourseTreeView
                courseTreeData={courseTreeData}
                onSelected={onSelected}
                selectedKey={selectedKey}
                onAddCourse={()=>setIsAddCourseModalVisible(true)}
                onUpdateCourse={ (id)=>{courseId=id;setIsUpdateCourseModalVisible(true)} }
                onDeleteCourse={ (id)=>{courseId=id;setIsDeleteCourseModalVisible(true)} }
            />
        </>
    )
}