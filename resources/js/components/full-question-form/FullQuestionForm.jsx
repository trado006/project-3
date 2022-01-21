import { useState, useEffect, useRef } from "react";
import { Card, message } from "antd";

export default function App({ submitBtnValue, fullQuestionInit, onSubmitFullQuestion, reverse }){
    const inactiveChoiceIconStyle = {fontSize: '22px'}
    const activeChoiceIconStyle = {fontSize: '22px', color: 'blue'}
    const [ choice1, setChoice1 ] = useState(false);
    const [ choice2, setChoice2 ] = useState(false);
    const [ choice3, setChoice3 ] = useState(false);
    const [ choice4, setChoice4 ] = useState(false);

    var contentRef = useRef();
    var choice1Ref = useRef();
    var choice2Ref = useRef();
    var choice3Ref = useRef();
    var choice4Ref = useRef();

    useEffect(()=>{
        if(fullQuestionInit) init(fullQuestionInit);
        adjustAllElement();
    }, []);

    useEffect(()=>{
        reset();
    }, [reverse]);

    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        let fullQuestion = {
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
        if(fullQuestion.choice1&&fullQuestion.answer1) count++;
        if(fullQuestion.choice2&&fullQuestion.answer2) count++;
        if(fullQuestion.choice3&&fullQuestion.answer3) count++;
        if(fullQuestion.choice4&&fullQuestion.answer4) count++;
        if(count==0) {
            message.error('Question must have atleast a true choice');
            return false;
        }
        onSubmitFullQuestion(fullQuestion);
    }

    const init = (fullQuestionInit) => {
        contentRef.current.value = fullQuestionInit.content;
        choice1Ref.current.value = fullQuestionInit.choice1;
        choice2Ref.current.value = fullQuestionInit.choice2;
        choice3Ref.current.value = fullQuestionInit.choice3;
        choice4Ref.current.value = fullQuestionInit.choice4;
        setChoice1(fullQuestionInit.answer1);
        setChoice2(fullQuestionInit.answer2);
        setChoice3(fullQuestionInit.answer3);
        setChoice4(fullQuestionInit.answer4);
    }

    const adjustAllElement = () => {
        contentAdjust(contentRef.current);
        textAreaAdjust(choice1Ref.current);
        textAreaAdjust(choice2Ref.current);
        textAreaAdjust(choice3Ref.current);
        textAreaAdjust(choice4Ref.current);
    }

    const reset = () => {
        contentRef.current.value = '';
        choice1Ref.current.value = '';
        choice2Ref.current.value = '';
        choice3Ref.current.value = '';
        choice4Ref.current.value = '';
        contentAdjust(contentRef.current);
        textAreaAdjust(choice1Ref.current);
        textAreaAdjust(choice2Ref.current);
        textAreaAdjust(choice3Ref.current);
        textAreaAdjust(choice4Ref.current);
        setChoice1(false);
        setChoice2(false);
        setChoice3(false);
        setChoice4(false);
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

    return (
        <>
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
            <button type="submit" className="btn btn-primary w-100 rounded-0">{ submitBtnValue || 'Submit' }</button>
        </form>
        </>
    );
}