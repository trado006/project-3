import { useState, useEffect, useRef } from 'react';
import { Modal, message } from 'antd';

import LectureForm from '../lecture-form/LectureForm';

export default function AddLectureModal({ courseId, onAddLectureDone, onCancel }){
    const postLecture = (lecture) => {
        axios.post(`course/${courseId}/lecture/`, lecture)
        .then((res)=>{
            console.log(res.data);
            switch(res.data.error_code){
                case 0:
                    onAddLectureDone(courseId, res.data.lecture);
                    message.success("Add lecture successfully");
                    onCancel();
                    break;
                case 1:
                    message.error(res.data.error[0][1]);
                    break;
                case 2:
                    message.error('Update lecure fails');
                    console.log(res.data);
                    break;
            }
        }).catch((err)=>{
            message.error('View detai error in console');
            console.log(err);
        })
    }

  return (
    <>
        <Modal
            title="Add lecture"
            onCancel={onCancel}
            footer={null}
            visible={true}
            zIndex={5}
            width={600}
        >
           <LectureForm submitBtnValue="Add lecture" onSubmitLecture={postLecture} /> 
        </Modal>
    </>
  );
};