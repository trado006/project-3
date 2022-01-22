import TopBar from '../../components/topbar/TopBar';
import CourseTreePane from './CourseTreePane';
import CourseViewWrapper from '../../components/course-view/CourseViewWrapper';
import LectureViewWrapper from '../../components/lecture-view/LectureViewWrapper';
import CourseMemberTeacherWrapper from '../../components/course-members/CourseMemberTeacherWrapper';
import ViewTest from './ViewTest';

import { useState } from 'react';

export default function App() {
    const [selectedItem, setSelectedItem] = useState({
        key: '',
        type: '',
        id: 0,
    });

    const onSelected = (selectedKeys) => {
        var item = {
            key: selectedKeys[0],
            type: selectedKeys[0]? selectedKeys[0].slice(0,1) : '',
            id: selectedKeys[0]? selectedKeys[0].slice(2): 0,
        }
        setSelectedItem(item);
    }
    
    return (
        <>
        <TopBar choose="My courses" />

        <div className="d-flex" style={{height: 'calc(100vh - 41px)'}}>
            <div className="d-flex menu-bar overflow-auto" style={{width: '350px', borderRight: '1px solid #eee'}}>
                <CourseTreePane
                    selectedKey={selectedItem.key}
                    onSelected={onSelected}
                />
            </div>
            <div className="content-bar flex-grow-1 overflow-auto">
                <div className="p-4 pb-5 bg-white" style={{minHeight:'100%'}}>
                    {
                        (selectedItem.type=='C') &&
                        <>
                            <div style={{width: '640px'}}>
                                <CourseViewWrapper idObj={{value: selectedItem.id}} />
                            </div>
                            <div className="border-top pt-5">
                                <CourseMemberTeacherWrapper courseId={selectedItem.id} />
                            </div>
                        </>
                    }
                    {
                        (selectedItem.type=='L') &&
                        <div style={{width: '640px'}}>
                            <LectureViewWrapper idObj={{value: selectedItem.id}} />
                        </div>
                    }
                    <div className="">
                        
                        {(selectedItem.type=='T') && <ViewTest selectedItem={selectedItem} /> }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}