import { useState, useEffect } from "react";

import { message } from 'antd';


import CourseTreeView from "../../components/course-tree/CourseTreeView";
import AddLectureModal from "../../components/add-lecture-modal/AddLectureModal";
import UpdateLectureModal from "../../components/update-lecture-modal/UpdateLectureModal";
import DeleteLectureModal from "../../components/delete-lecture-model/DeleteLectureModal";
import AddTestModal from "../../components/add-test-modal/AddTestModal";
import UpdateTestModal from "../../components/update-test-modal/UpdateTestModal";
import DeleteTestModal from "../../components/delete-test-modal/DeleteTestModal";
import TestResultTableModal from "./TestResultTableModal";

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
    const [isTestResultTableModalVisible, setIsTestResultTableModalVisible] = useState(false);
    
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

    const addLecture = (courseId, lecture) => {
        let newLecture = {
            id: lecture.id,
            name: lecture.name,
            tests: [],
        }
        courses.forEach((item, index)=>{
            if(item.id==courseId){
                item.lectures.unshift(newLecture);
            }
        })
        setCourseTreeData([...courses]);
    }

    const updateLecture = (lectureResponse)=>{
        courses.forEach((course, courseIndex)=>{
            var lectures = course.lectures;
            for (var i = 0; i < lectures.length; ++i) {
                var lecture = lectures[i];
                if (lecture.id==lectureResponse.id) {
                    var updatedLecture = {
                        id: lectureResponse.id,
                        name: lectureResponse.name,
                        tests: lecture.tests,
                    }
                    lectures[i] = updatedLecture;
                    break;
                }
            }
        })
        setCourseTreeData([...courses]);
        if(selectedItem.type=='L'&&selectedItem.id==lectureResponse.id)
            setSelectedItem({key:'',type:'',id:0});
    }

    const deleteLecture = () => {
        courses.forEach((course, courseIndex)=>{
            var lectures = course.lectures;
            for (var i = 0; i < lectures.length; ++i) {
                var lecture = lectures[i];
                if (lecture.id==lectureId) {
                    lectures.splice(i, 1);
                    break;
                }
            }
        })
        if(selectedItem.type=='L'&&selectedItem.id==lectureId)
            setSelectedItem({key:'',type:'',id:0});
        setCourseTreeData([...courses]);
    }

    const addTest = (lectureId, testResponse) => {
        var newTest = {
            id: testResponse.id,
            name: testResponse.name,
        }
        courses.forEach((course, courseIndex)=>{
            var lectures = course.lectures;
            for (var i = 0; i < lectures.length; ++i) {
                var lecture = lectures[i];
                if (lecture.id==lectureId) {
                    lecture.tests.unshift(newTest);
                    break;
                }
            }
        })
        setCourseTreeData([...courses]);
    }

    const updateTest = (testResponse) => {
        courses.forEach((course, courseIndex)=>{
            var lectures = course.lectures;
            lectures.forEach((lecture, lectureIndex)=>{
                var tests = lecture.tests;
                for (var i = 0; i < tests.length; ++i) {
                    var test = tests[i];
                    if (test.id==testResponse.id) {
                        test.name = testResponse.name;
                        break;
                    }
                }
            })
        })
        setCourseTreeData([...courses]);
        if(selectedItem.type=='T'&&selectedItem.id==testResponse.id)
            setSelectedItem({key:'',type:'',id:0});
    }

    const deleteTest = ()=>{
        courses.forEach((course, courseIndex)=>{
            var lectures = course.lectures;
            lectures.forEach((lecture, lectureIndex)=>{
                var tests = lecture.tests;
                for (var i = 0; i < tests.length; ++i) {
                    var test = tests[i];
                    if (test.id==testId) {
                        tests.splice(i,1);
                        break;
                    }
                }
            })
        })
        setCourseTreeData([...courses]);
        if(selectedItem.type=='T'&&selectedItem.id==testId)
            setSelectedItem({key:'',type:'',id:0});
    }

    return (
        <>
            {
                isAddLectureModalVisible &&
                <AddLectureModal
                    courseId={courseId}
                    onAddLectureDone={addLecture}
                    onCancel={()=>setIsAddLectureModalVisible(false)}
                />
            }

            {
                isUpdateLectureModalVisible &&
                <UpdateLectureModal
                    lectureId={lectureId}
                    onUpdateLectureDone={updateLecture}
                    onCancel={()=>setIsUpdateLectureModalVisible(false)}
                />
            }

            {
                isDeleteLectureModalVisible &&
                <DeleteLectureModal
                    lectureId={lectureId}
                    onDeleteLectureDone={deleteLecture}
                    onHideModal={()=>setIsDeleteLectureModalVisible(false)}
                />
            }

            {isAddTestModalVisible &&
                <AddTestModal
                    lectureId={lectureId}
                    onAddTestDone={addTest}
                    onCancel={()=>setIsAddTestModalVisible(false)}
                />
            }
            {
                isUpdateTestModalVisible &&
                <UpdateTestModal
                    testId={testId}
                    onUpdateTestDone={updateTest}
                    onCancel={() => setIsUpdateTestModalVisible(false)}
                />
            }
            {isDeleteTestModalVisible &&
                <DeleteTestModal
                    testId={testId}
                    onDeleteTestDone={deleteTest}
                    onHideModal={()=>setIsDeleteTestModalVisible(false)}
                />
            }
            {
                isTestResultTableModalVisible &&
                <TestResultTableModal
                    testId={testId}
                    onHideModal={()=>setIsTestResultTableModalVisible(false)}
                />
            }

            <CourseTreeView
                courseTreeData={courseTreeData}
                onSelected={onSelected}
                selectedKey={selectedKey}
                onAddLecture={(id)=>{courseId=id;setIsAddLectureModalVisible(true)}}
                onUpdateLecture={(id)=>{lectureId=id;setIsUpdateLectureModalVisible(true)}}
                onDeleteLecture={(id)=>{lectureId=id; setIsDeleteLectureModalVisible(true) }}
                onAddTest={(id)=>{lectureId=id;setIsAddTestModalVisible(true)}}
                onUpdateTest={(id)=>{testId=id;setIsUpdateTestModalVisible(true)}}
                onDeleteTest={(id)=>{testId=id;setIsDeleteTestModalVisible(true)}}
                onViewTestResults={(id)=>{testId=id;setIsTestResultTableModalVisible(true)}}
            />
        </>
    )
}