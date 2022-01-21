import { useState, useEffect } from "react";

import { message } from 'antd';


import CourseTreeView from "../../components/course-tree/CourseTreeView";


var courseId = 0;
var lectureId = 0;
var testId = 0;
var courses = [];
export default function App({ selectedKey, onSelected}){
    const [courseTreeData, setCourseTreeData] = useState([]);

    const [isAddLectureModalVisible, setIsAddLectureModalVisible] = useState(false);
    const [isUpdateLectureModalVisible, setIsUpdateLectureModalVisible] = useState(false);
    const [isDeleteLectureModalVisible, setIsDeleteLectureModalVisible] = useState(false);
    const [isAddTestModalVisible, setIsAddTestModalVisible] = useState(false);
    const [isUpdateTestModalVisible, setIsUpdateTestModalVisible] = useState(false);
    const [isDeleteTestModalVisible, setIsDeleteTestModalVisible] = useState(false);
    
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

    return (
        <>
            <CourseTreeView
                courseTreeData={courseTreeData}
                onSelected={onSelected}
                selectedKey={selectedKey}
            />
        </>
    )
}