import { useState, useEffect } from 'react';
import { Modal, message } from 'antd';

import TestForm from '../../components/test-form/TestForm'

export default function AddTestModal({ lectureId, onAddTestDone, onCancel }){

    const postTest = (test) => {
        axios.post(`lecture/${lectureId}/test/`, test)
        .then((res)=>{
            switch(res.data.error_code){
                case 0:
                    onAddTestDone(lectureId, res.data.test);
                    onCancel()
                    break;
                case 1:
                    message.error(res.data.error[0][1]);
                    break;
                case 2:
                    message.error('Add test fails');
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
            title={<span>Add test</span>}
            onCancel={onCancel}
            footer={null}
            visible={true}
            zIndex={5}
            width={640}
        >
            <TestForm submitBtnValue="Add test" onSubmitTest={postTest} />
        </Modal>
    </>
  );
};