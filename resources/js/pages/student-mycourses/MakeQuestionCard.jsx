import { useRef, useState, useEffect } from "react";
import { Card } from "antd";

export default function MakeQuestionCard({ className, number, question, answerOut }){
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
        contentRef.current.value = question.content;
        choice1Ref.current.value = question.choice1;
        choice2Ref.current.value = question.choice2;
        if(question.choice3) choice3Ref.current.value = question.choice3;
        if(question.choice4) choice4Ref.current.value = question.choice4;
        setChoice1(false);
        setChoice2(false);
        setChoice3(false);
        setChoice4(false);
        answerOut.choice1 = false;
        answerOut.choice2 = false;
        answerOut.choice3 = false;
        answerOut.choice4 = false;
        adjustAllElement();
    }, [question]);

    const adjustAllElement = () => {
        textAreaAdjust(contentRef.current);
        textAreaAdjust(choice1Ref.current);
        textAreaAdjust(choice2Ref.current);
        if(question.choice3) textAreaAdjust(choice3Ref.current);
        if(question.choice4) textAreaAdjust(choice4Ref.current);
    }

    const textAreaAdjust = (element) => {
        element.style.height = "1px";
        element.style.height = (element.scrollHeight)+"px";
    }

    return (
        <>
        <Card
            className={className}
            size="small"
            title={<span><i className="fa fa-question text-primary"></i> Question {number}</span>}
        >
            <textarea ref={contentRef} className="w-100 outline-0 mb-2"
                disabled-custom="true" disabled={true} ></textarea>
            
            <div className="d-flex flex-row">
                <div style={{width: '24px'}}>
                    <i className={choice1? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice1? activeChoiceIconStyle: inactiveChoiceIconStyle}
                        onClick={ ()=>{let tmp=!choice1; setChoice1(tmp); answerOut.choice1 = tmp;} }
                    ></i>
                </div>
                <textarea ref={choice1Ref} className="flex-grow-1 outline-0"
                    disabled-custom="true" disabled={true}></textarea>
            </div>

            <div className="d-flex flex-row">
                <div style={{width: '24px'}}>
                    <i className={choice2? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice2? activeChoiceIconStyle: inactiveChoiceIconStyle}
                        onClick={ ()=>{let tmp=!choice2; setChoice2(tmp); answerOut.choice2 = tmp;} }
                    ></i>
                </div>
                <textarea ref={choice2Ref} className="flex-grow-1 outline-0"
                    disabled-custom="true" disabled={true}></textarea>
            </div>

            { question.choice3 &&
            <div className="d-flex flex-row">
                <div style={{width: '24px'}}>
                    <i className={choice3? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice3? activeChoiceIconStyle: inactiveChoiceIconStyle}
                        onClick={ ()=>{let tmp=!choice3; setChoice3(tmp); answerOut.choice3 = tmp;} }
                    ></i>
                </div>
                <textarea ref={choice3Ref} className="flex-grow-1 outline-0"
                    disabled-custom="true" disabled={true}></textarea>
            </div>
            }

            { question.choice4 &&
            <div className="d-flex flex-row">
                <div style={{width: '24px'}}>
                    <i className={choice4? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice4? activeChoiceIconStyle: inactiveChoiceIconStyle}
                        onClick={ ()=>{let tmp=!choice4; setChoice4(tmp); answerOut.choice4 = tmp;} }
                    ></i>
                </div>
                <textarea ref={choice4Ref} className="flex-grow-1 outline-0"
                    disabled-custom="true" disabled={true}></textarea>
            </div>
            }
        </Card>
        </>
    );
}