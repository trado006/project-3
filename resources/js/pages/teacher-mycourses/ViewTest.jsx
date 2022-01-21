import { useState, useEffect, useRef } from "react";
import { message } from "antd";
import UpdateQuestionModal from './UpdateQuestionModal';

import TestInfo from '../../components/test-info/TestInfo';
import FullQuestionCard from '../../components/full-question-card/FullQuestionCard';
import AddQuestionCard from './AddQuestionCard';

var choosedFullQuestion;
export default function App({selectedItem}){
    var testId = selectedItem.id;
    const [test, setTest] = useState({
        id: 0,
        name: '',
        description: '',
    });
    const [ fullQuestions, setFullQuestions ] = useState([]);
    const [isUpdateQuestionModalVisible, setIsUpdateQuestionModalVisible] = useState(false);

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
            // setDescription(res.data.test.description);
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });

        axios.get(`/test/${testId}/full-questions`)
        .then(function (res) {
            if(res.data.error_code){
                console.log(res.data);
                message.error("Request error: view detail in console");
                return;
            }

            setFullQuestions(res.data.full_questions);
        })
        .catch((error) => {
            message.error("Request error: view detail in console");
            console.log(error);
        });
    }, [testId]);

    const addFullQuestion = (fullQuestion) => {
        setFullQuestions([...fullQuestions, fullQuestion]);
    }

    const deleteFullQuestion = (fullQuestion) => {
        axios.delete(`full-question/${fullQuestion.id}`)
        .then((res)=>{
            if(!res.data.error_code){
                let fullQuestionsResult = fullQuestions.filter((item)=>{
                    return item.id!=fullQuestion.id;
                });
                setFullQuestions(fullQuestionsResult);
            }
        })
        .catch((err)=>{
            message.error("Request error: view detail in console");
            console.log(err);
        })
    }

    const onUpdateQuestion = (fullQuestion) => {
        choosedFullQuestion = fullQuestion;
        setIsUpdateQuestionModalVisible(true);
    }

    const updateFullQuestion = (fullQuestion) => {
        let fullQuestionsData = fullQuestions.map((item)=>{
            if(item.id!=fullQuestion.id){
                return item;
            }else{
                return fullQuestion;
            }
        });
        setFullQuestions(fullQuestionsData);
    }


    return (
        <>
        {isUpdateQuestionModalVisible &&
        <UpdateQuestionModal fullQuestion={choosedFullQuestion} updateFullQuestion={updateFullQuestion}
        setIsModalVisible={setIsUpdateQuestionModalVisible} />
        }
        <div>
            <div className="d-flex flex-column align-items-center">
                <div className="mb-3" style={{width: '640px'}}>
                    <TestInfo test={test} />
                </div>
                <div style={{width: '640px'}}>
                    { fullQuestions.map((fullQuestion, index)=>
                        <FullQuestionCard className="mb-5" key={index} number={index+1} fullQuestion={fullQuestion}
                            deleteFullQuestion={deleteFullQuestion} updateFullQuestion={()=>onUpdateQuestion(fullQuestion)} /> )
                    }
                </div>
                <div className="mb-5" style={{width: '640px'}}>
                    <AddQuestionCard testId={testId} addFullQuestion={addFullQuestion} />
                </div>
            </div>
        </div>
        </>
    );
};