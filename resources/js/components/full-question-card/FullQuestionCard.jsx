import { useRef, useEffect } from "react";
import { Card, Menu, Dropdown } from "antd";

export default function App({ className, number, fullQuestion, updateFullQuestion, deleteFullQuestion }){
    const inactiveChoiceIconStyle = {fontSize: '22px'}
    const activeChoiceIconStyle = {fontSize: '22px', color: 'blue'}
    
    const choice1 = fullQuestion.answer1;
    const choice2 = fullQuestion.answer2;
    const choice3 = fullQuestion.answer3;
    const choice4 = fullQuestion.answer4;

    var contentRef = useRef();
    var choice1Ref = useRef();
    var choice2Ref = useRef();
    var choice3Ref = useRef();
    var choice4Ref = useRef();

    //fa fa-close | fa fa-ellipsis-v | fa fa-pencil
    const MoreActionMenu = (
        <Menu onClick={(event) => {event.domEvent.stopPropagation()}}>
            <Menu.Item key="1">
                <a onClick={()=>{ updateFullQuestion(fullQuestion); }}>
                    <i className="fa fa-pencil text-primary"></i> Update question
                </a>
            </Menu.Item>
            <Menu.Item key="2">
                <a onClick={()=>{ deleteFullQuestion(fullQuestion); }}>
                    <i className="fa fa-close text-danger"></i> Delete question
                </a>
            </Menu.Item>
        </Menu>
    )

    const ExtraOption = (
        <Dropdown
            overlay={ MoreActionMenu }
            trigger={['click']}
        >
            <i className="fa fa-ellipsis-v px-2"></i>
        </Dropdown>
    )

    useEffect(()=>{
        contentRef.current.value = fullQuestion.content;
        choice1Ref.current.value = fullQuestion.choice1;
        choice2Ref.current.value = fullQuestion.choice2;
        if(fullQuestion.choice3) choice3Ref.current.value = fullQuestion.choice3;
        if(fullQuestion.choice4) choice4Ref.current.value = fullQuestion.choice4;
        adjustAllElement();
    }, [fullQuestion]);

    const adjustAllElement = () => {
        textAreaAdjust(contentRef.current);
        textAreaAdjust(choice1Ref.current);
        textAreaAdjust(choice2Ref.current);
        if(fullQuestion.choice3) textAreaAdjust(choice3Ref.current);
        if(fullQuestion.choice4) textAreaAdjust(choice4Ref.current);
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
            extra={ ExtraOption }
        >
            <textarea ref={contentRef} className="w-100 outline-0 mb-2"
                name="content" placeholder="Question content"
                disabled-custom="true" disabled={true} ></textarea>
            
            <div className="d-flex flex-row">
                <div style={{width: '24px'}}>
                    <i className={choice1? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice1? activeChoiceIconStyle: inactiveChoiceIconStyle}
                    ></i>
                </div>
                <textarea ref={choice1Ref} className="flex-grow-1 outline-0" name="choice1"
                    disabled-custom="true" disabled={true}></textarea>
            </div>

            <div className="d-flex flex-row">
                <div style={{width: '24px'}}>
                    <i className={choice2? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice2? activeChoiceIconStyle: inactiveChoiceIconStyle}
                    ></i>
                </div>
                <textarea ref={choice2Ref} className="flex-grow-1 outline-0" name="choice2"
                    disabled-custom="true" disabled={true}></textarea>
            </div>

            { fullQuestion.choice3 &&
            <div className="d-flex flex-row">
                <div style={{width: '24px'}}>
                    <i className={choice3? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice3? activeChoiceIconStyle: inactiveChoiceIconStyle}
                    ></i>
                </div>
                <textarea ref={choice3Ref} className="flex-grow-1 outline-0" name="choice3"
                    disabled-custom="true" disabled={true}></textarea>
            </div>
            }

            { fullQuestion.choice4 &&
            <div className="d-flex flex-row">
                <div style={{width: '24px'}}>
                    <i className={choice4? "fa fa-check-square-o m-1": "fa fa-square-o m-1"}
                        style={choice4? activeChoiceIconStyle: inactiveChoiceIconStyle}
                    ></i>
                </div>
                <textarea ref={choice4Ref} className="flex-grow-1 outline-0" name="choice4"
                    disabled-custom="true" disabled={true}></textarea>
            </div>
            }
        </Card>
        </>
    );
}