import { useState, useEffect, useRef } from "react";
import { Card, message } from "antd";

import FullQuestionForm from '../../components/full-question-form/FullQuestionForm'

export default function App({ testId, addFullQuestion }){
    const [fullQuestionFormReverse, setFullQuestionFormReverse] = useState(false);
    const postFullQuestion = (fullQuestion) => {
        axios.post(`test/${testId}/full-question/`,fullQuestion)
        .then((res)=>{
            switch(res.data.error_code){
                case 0:
                    addFullQuestion(res.data.full_question);
                    message.success('Add new question done');
                    setFullQuestionFormReverse(!fullQuestionFormReverse);
                    break;
                case 1:
                    message.error(res.data.error[0][1]);
                    break;
                case 2:
                    message.error('Add question fails');
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
        <Card size="small" title={<div><i className="fa fa-question text-primary" style={{fontSize: '24px'}}></i> New question</div>}>
            <FullQuestionForm submitBtnValue="Add question" onSubmitFullQuestion={postFullQuestion} reverse={fullQuestionFormReverse} />
        </Card>
        </>
    );
}