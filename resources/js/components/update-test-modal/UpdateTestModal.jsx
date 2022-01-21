import { useState, useEffect } from 'react';
import { Modal, message } from 'antd';

import TestForm from '../../components/test-form/TestForm'

export default function UpdateTestModal({ testId, onUpdateTestDone, onCancel }){
    const [ test, setTest ] = useState({
        id: 0,
        name: '',
        description: '',
    });

    useEffect(()=>{
        axios.get(`/test/${testId}`)
        .then(function (res) {
            if(res.data.error_code){
                console.log(res.data);
                message.error("Request error: view detail in console");
                return;
            }
            setTest(res.data.test);
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });
    }, [testId]);

    const putTest = (requestData) => {
        axios.put(`test/${testId}`,requestData)
        .then((res)=>{
            switch(res.data.error_code){
                case 0:
                    onUpdateTestDone(res.data.test);
                    onCancel();
                    break;
                case 1:
                    message.error(res.data.error[0][1]);
                    break;
                case 2:
                    message.error('Update test fails');
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
            title={<span>Update test</span>}
            onCancel={onCancel}
            footer={null}
            visible={true}
            zIndex={5}
        >
            <TestForm submitBtnValue="Update test" testInit={test} onSubmitTest={putTest} />
        </Modal>
    </>
  );
};