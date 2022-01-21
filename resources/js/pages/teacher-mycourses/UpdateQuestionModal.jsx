import { useState, useEffect, useRef } from 'react';
import { Modal, message } from 'antd';

import API from '../../util/api';

export default function App({ fullQuestion, updateFullQuestion, setIsModalVisible }){
    const inactiveChoiceIconStyle = {fontSize: '22px'}
    const activeChoiceIconStyle = {fontSize: '22px', color: 'blue'}
    const [ choice1, setChoice1 ] = useState(!!fullQuestion.answer1);
    const [ choice2, setChoice2 ] = useState(!!fullQuestion.answer2);
    const [ choice3, setChoice3 ] = useState(!!fullQuestion.answer3);
    const [ choice4, setChoice4 ] = useState(!!fullQuestion.answer4);

    var contentRef = useRef();
    var choice1Ref = useRef();
    var choice2Ref = useRef();
    var choice3Ref = useRef();
    var choice4Ref = useRef();

    useEffect(()=>{
        contentRef.current.value = fullQuestion.content;
        choice1Ref.current.value = fullQuestion.choice1;
        choice2Ref.current.value = fullQuestion.choice2;
        if(fullQuestion.choice3) choice3Ref.current.value = fullQuestion.choice3;
        if(fullQuestion.choice4) choice4Ref.current.value = fullQuestion.choice4;
        adjustAllElement();
    }, [fullQuestion]);

    const adjustAllElement = () => {
        contentAdjust(contentRef.current);
        textAreaAdjust(choice1Ref.current);
        textAreaAdjust(choice2Ref.current);
        textAreaAdjust(choice3Ref.current);
        textAreaAdjust(choice4Ref.current);
    }

    const textAreaAdjust = (element) => {
        element.style.height = "1px";
        element.style.height = (element.scrollHeight)+"px";
    }

    const contentAdjust = (element) => {
        element.style.height = "1px";
        if(element.scrollHeight>4*25)
        element.style.height = (element.scrollHeight)+"px";
        else
        element.style.height = (4*25) + "px";
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        let request = {
            content: data.content.value,
            choice1: data.choice1.value,
            choice2: data.choice2.value,
            choice3: data.choice3.value,
            choice4: data.choice4.value,
            answer1: choice1,
            answer2: choice2,
            answer3: choice3,
            answer4: choice4,
        }
        let count = 0;
        if(request.choice1&&request.answer1) count++;
        if(request.choice2&&request.answer2) count++;
        if(request.choice3&&request.answer3) count++;
        if(request.choice4&&request.answer4) count++;
        if(count==0) {
            message.error('Question must have atleast a true choice');
            return false;
        }
        console.log(request);
        API.put(`full-question/${fullQuestion.id}`,request)
        .then((res)=>{
            console.log(res.data);
            switch(res.data.error_code){
                case 0:
                    updateFullQuestion(res.data.full_question);
                    setIsModalVisible(false);
                    //message.success('Add new question is done');
                    break; 
                case 1:
                    message.error(res.data.error[0][1]);
                    break;
                case 2:
                    message.error('Update question fails');
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
            title={<span>Update question</span>}
            onCancel={handleCancel}
            footer={null}
            visible={true}
            width={640}
            zIndex={5}
        >
        <form onSubmit={onSubmit}>
            <textarea ref={contentRef} className="outline-0 w-100 rounded-0 mb-4"
                name="content" placeholder="Question content"
                onChange={(event)=>contentAdjust(event.target)} required></textarea>
            
            <div className="d-flex flex-row mb-2">
                <div style={{width: '24px'}}>
                    <i className={choice1? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice1? activeChoiceIconStyle: inactiveChoiceIconStyle}
                        onClick={ ()=>setChoice1(!choice1) }></i>
                </div>
                <textarea ref={choice1Ref} className="flex-grow-1 outline-0"
                    name="choice1" placeholder="Choice 1" style={{resize: 'none'}}
                    onChange={(event)=>textAreaAdjust(event.target)} required></textarea>
            </div>
            <div className="d-flex flex-row mb-2">
                <div style={{width: '24px'}}>
                    <i className={choice2? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice2? activeChoiceIconStyle: inactiveChoiceIconStyle}
                        onClick={ ()=> setChoice2(!choice2) }></i>
                </div>
                <textarea ref={choice2Ref} className="flex-grow-1 outline-0"
                    name="choice2" placeholder="Choice 2" style={{resize: 'none'}}
                    onChange={(event)=>textAreaAdjust(event.target)} required></textarea>
            </div>
            <div className="d-flex flex-row mb-2">
                <div style={{width: '24px'}}>
                    <i className={choice3? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice3? activeChoiceIconStyle: inactiveChoiceIconStyle}
                        onClick={ ()=> setChoice3(!choice3)}></i>
                </div>
                <textarea ref={choice3Ref} className="flex-grow-1 outline-0"
                name="choice3" placeholder="Choice 3" style={{resize: 'none'}}
                onChange={(event)=>textAreaAdjust(event.target)}></textarea>
            </div>
            <div className="d-flex flex-row mb-4">
                <div style={{width: '24px'}}>
                    <i className={choice4? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice4? activeChoiceIconStyle: inactiveChoiceIconStyle}
                        onClick={ ()=> setChoice4(!choice4) }></i>
                </div>
                <textarea ref={choice4Ref} className="flex-grow-1 outline-0"
                name="choice4" placeholder="Choice 4" style={{resize: 'none'}}
                onChange={(event)=>textAreaAdjust(event.target)}></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100 rounded-0 text-uppercase">Update Question</button>
        </form>
        </Modal>
    </>
  );
};