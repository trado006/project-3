import TopBar from '../../components/topbar/TopBar';
import CourseTree from './CourseTree';
import ViewCourse from './ViewCourse';
import { useEffect, useState } from 'react';

import MembersInCourse from './MembersInCourse';

export default function AdminCourse() {
    const [selectedCourseId, setSelectedCourseId] = useState('');
    
    return (
        <>
        <TopBar choose="Courses" />

        <div className="d-flex" style={{height: 'calc(100vh - 41px)'}}>
            <div className="d-flex menu-bar overflow-auto" style={{width: '350px'}}>
                <CourseTree
                    className="flex-grow-1"
                    selectedCourseId={selectedCourseId}
                    setSelectedCourseId={setSelectedCourseId}
                />
            </div>
            <div className="content-bar flex-grow-1 overflow-auto" style={{padding: '20px', background: '#f0f2f5'}}>
                <div className="border p-4 bg-white" style={{minHeight:'100%'}}>
                    <div className="">
                        {selectedCourseId && <ViewCourse courseId={selectedCourseId.slice(2)} /> }
                        <div className="row mt-4">
                            <div className="col-md-12">
                                { selectedCourseId && <MembersInCourse courseId={selectedCourseId.slice(2)} />}
                            </div>
                        </div>
                    </div>
                </div>
                

            </div>
        </div>
        </>
    )
}

/*
<Tree
            showIcon
            showLine={{showLeafIcon: false}}
            defaultExpandAll
            defaultSelectedKeys={['0-0-0']}
            switcherIcon={<DownOutlined />}
            onSelect={onSelected}
            treeData={treeData}
        />
        */