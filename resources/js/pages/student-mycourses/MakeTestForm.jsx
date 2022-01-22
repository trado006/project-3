import { useState, useEffect, useRef } from "react";
import { message } from "antd";

import TestInfo from '../../components/test-info/TestInfo';
import MakeQuestionCard from './MakeQuestionCard';
import TestResultModal from "./TestResultModal";

var answers = [];
var testResult = {};
export default function App({idObj}){
    var testId = idObj.value;
    const [test, setTest] = useState({
        id: 0,
        name: '',
        description: '',
    });
    const [ questions, setQuestions ] = useState([]);
    const [isTestResultModalVisible, setIsTestResultModalVisible] = useState(false);

    useEffect( ()=>{
        axios.get(`/test/${testId}`)
        .then(function (res) {
            if(res.data.error_code){
                console.log(res.data);
                message.error("Request error: view detail in console");
                return;
            }
            console.log(res.data);
            setTest(res.data.test);
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });

        axios.get(`/test/${testId}/questions`)
        .then(function (res) {
            if(res.data.error_code){
                console.log(res.data);
                message.error("Request error: view detail in console");
                return;
            }

            setQuestions(res.data.questions);
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });
    }, [testId]);

    const onSubmit = (event) => {
        event.preventDefault();
        if(answers.length==0){
            message.error('Test is empty');
            return;
        }
        axios.post(`test/${testId}/make-test`, answers)
        .then((res)=>{
            if(res.data.error_code){
                message.error('Request error: view detail in console');
                console.log(res.data);
                return;
            }
            testResult = res.data.test_result;
            setIsTestResultModalVisible(true);
        })
        .catch((err)=>{
            message.error('Request error: view detail in console');
            console.log(err);
        })
    }

    return (
        <>
        {
            isTestResultModalVisible &&
            <TestResultModal testResult={testResult} onHideModal={()=>setIsTestResultModalVisible(false)} />
        }
        <div style={{width: '640px'}}>
            <div className="mb-3">
                <TestInfo test={test} />
            </div>
            <div>
                { questions.map((question, index)=>{
                        answers[index] = {id: question.id};
                        return <MakeQuestionCard key={index} className="mb-5"
                            number={index+1} question={question} answerOut={answers[index]} />
                    })
                }
            </div>
            <div>
                <button type="submit" className="btn btn-primary w-100 rounded-0" onClick={onSubmit}>Submit</button>
            </div>
        </div>
        </>
    );
};