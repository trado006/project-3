import TopBar from '../../components/topbar/TopBar';
import CourseTreePane from './CourseTreePane';
import ViewCourse from './ViewCourse';
import ViewLecture from './ViewLecture';

import { useState } from 'react';

export default function StudentMycourses() {
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
            <div className="d-flex menu-bar overflow-auto" style={{width: '350px'}}>
                <CourseTreePane
                    selectedKey={selectedItem.key}
                    onSelected={onSelected}
                />
            </div>
            <div className="content-bar flex-grow-1 overflow-auto" style={{padding: '20px', background: '#f0f2f5'}}>
                <div className="border p-4 bg-white" style={{minHeight:'100%'}}>
                    <div className="">
                        {(selectedItem.type=='C') && <ViewCourse selectedItem={selectedItem} /> }
                        {(selectedItem.type=='L') && <ViewLecture selectedItem={selectedItem} /> }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}