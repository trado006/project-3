//import {useState} from 'react';
import { Modal, message } from 'antd';
import API from '../../util/api';

import CourseForm from '../../components/course-form/CourseForm';

export default function App({ addCourse, setIsModalVisible }){
    var choosedFile = null;
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const postCourse = (course) => {
        API.post('/course',course)
        .then((res)=>{
            if(res.data.error_code){
                message.error('view detail error in console');
                console.log(res.data);
                return;
            }
            let course = {
                id: res.data.course.id,
                name: res.data.course.name,
            };
            addCourse(course);
            message.success("Add course successfully");
            setIsModalVisible(false);
        }).catch((err)=>{
            message.error('View detai error in console');
            console.log(err);
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        const formData = new FormData();
        if(!choosedFile){
            message.error("Course picture is required");
            return false;
        }
        formData.append('image', choosedFile, choosedFile.name);
        formData.append('code', data.code.value);
        formData.append('name', data.name.value);
        formData.append('price', data.price.value);
        formData.append('description', data.description.value);
        API.post('/course',formData)
        .then((res)=>{
            if(res.data.error_code){
                message.error('view detail error in console');
                console.log(res.data);
                return;
            }
            let course = {
                id: res.data.course.id,
                name: res.data.course.name,
            };
            addCourse(course);
            message.success("Add course successfully");
            setIsModalVisible(false);
        }).catch((err)=>{
            message.error('View detai error in console');
            console.log(err);
        })
    }

    const changeFile = (event) => {
        let input = event.target;
        if (input.files && input.files[0]) {
            choosedFile = input.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById('imageView').setAttribute('src',`${e.target.result}`);
                // setImageSource('url(' + e.target.result + ')');
            }
            reader.readAsDataURL(input.files[0]);
        }else{
            choosedFile = null;
            document.getElementById('imageView').removeAttribute('src');
            // setImageSource('');
        }
    }

    const onClickFileUpload = () => {
        document.getElementById('fileInput').click();
    }

  return (
    <>
        <Modal
            title={<span><i className="fa fa-book" /> Add course</span>}
            onCancel={handleCancel}
            footer={null}
            visible={true}
            zIndex={5}
            width={600} >
            <CourseForm postCourse={postCourse} />
        </Modal>
    </>
  );
};