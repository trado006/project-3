import { useState, useEffect, useRef } from 'react';
import { Modal, Table, message } from 'antd';

import axios from 'axios';

export default function TestResultTableModal({ testId, onHideModal }){
    const [ testResults, setTestResults ] = useState([]);

    const infoCols = [
        {
            title: 'Student name',
            dataIndex: 'full_name',
        },
        {
            title: 'True questions',
            dataIndex: 'score',
        },
        {
          title: 'Submit time',
          dataIndex: 'created_at',
        },
    ]
    useEffect(()=>{
        axios.get(`test/${testId}/test-results`)
        .then((res)=>{
            if(res.data.error_code){
                message.error('Request error: view detail in console');
                console.log(res.data);
                return;
            }
            setTestResults(res.data.test_results);
        })
        .catch((err)=>{
            console.log(err);
            message.error("Request error: view detail in console");
        })
    }, [testId]);

    const getRowKey = (record) => {
        return record.student_id;
    }

  return (
    <>
        <Modal
            title="View test results"
            onCancel={onHideModal}
            footer={null}
            visible={true}
            zIndex={5}
            width={600}
        >
           <Table columns={infoCols}
                rowKey={getRowKey} bordered={true} dataSource={testResults} />
        </Modal>
    </>
  );
};