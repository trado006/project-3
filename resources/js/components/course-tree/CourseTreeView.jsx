import { Tree, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

export default function CourseTreeView({ courseTreeData, selectedKey, onSelected,
                                onAddCourse, onUpdateCourse, onDeleteCourse,
                                onAddLecture, onUpdateLecture, onDeleteLecture,
                                onAddTest, onUpdateTest, onDeleteTest }){

    //const [courseTreeView, setCourseTreeView] = useState([]);
    const [courseTreeView, setCourseTreeView ] = useState([]);

    useEffect(()=>{
        console.log('course tree view use effect');
        setCourseTreeView(getCourseTreeView());
    }, [courseTreeData]);
    const getCourseTreeView = () => {
        var courseTree = [];
        courseTreeData.forEach( (item) => {
            var lectures = [];
            item.lectures.forEach( (item) => {
                var tests = [];
                item.tests.forEach( (item) => {
                    var test = {
                        title: TestTitle(item),
                        key: 'T-'+item.id,
                    }
                    tests.push(test);
                })
                var lecture = {
                    title: LectureTitle(item),
                    key: 'L-'+item.id,
                    children: tests,
                }
                lectures.push(lecture);
            })
            var course = {
                title: CourseTitle(item),
                key: 'C-'+item.id,
                children: lectures,
            };
            courseTree.push(course);
        });
        return courseTree;
    }

    function CourseMenu(courseId) {
        return (
            <Menu onClick={(event) => {event.domEvent.stopPropagation()}}>
            {
                onAddLecture &&
                <Menu.Item key="1">
                    <a onClick={()=>{ onAddLecture(courseId); }}>
                        Add Lecture
                    </a>
                </Menu.Item>
            }
            {
                onUpdateCourse &&
                <Menu.Item key="2">
                    <a onClick={()=>{ onUpdateCourse(courseId); }}>
                        Update course
                    </a>
                </Menu.Item>
            }
            {
                onDeleteCourse &&
                <Menu.Item key="3">
                    <a onClick={()=>{ onDeleteCourse(courseId); }}>
                        Delete course
                    </a>
                </Menu.Item>
            }
            </Menu>
        )
    }

    function CourseTitle(item){
        if( !onAddLecture && !onUpdateCourse && !onDeleteCourse) 
        return <div><i className="fa fa-book" /> {item.name}</div>;
        return (
            <Dropdown
                overlay={ CourseMenu(item.id) }
                onContextMenu={event=>event.stopPropagation()}
                trigger={['contextMenu']}
            >
                <div><i className="fa fa-book" /> {item.name}</div>
            </Dropdown>
        )
    }

    function LectureMenu(lectureId) {
        return (
            <Menu onClick={(event) => {event.domEvent.stopPropagation()}}>
            {
                onAddTest &&
                <Menu.Item key="1">
                    <a onClick={ () => onAddTest(lectureId) }>
                        Add test
                    </a>
                </Menu.Item>
            }
            {
                onUpdateLecture &&
                <Menu.Item key="2">
                    <a onClick={()=>{ onUpdateLecture(lectureId) }}>
                        Update lecture
                    </a>
                </Menu.Item>
            }
            {
                onDeleteLecture &&
                <Menu.Item key="3">
                    <a onClick={()=>{ onDeleteLecture(lectureId) }}>
                        Delete lecture
                    </a>
                </Menu.Item>
            }
            </Menu>
        )
    }

    function LectureTitle(item){
        if( !onAddTest && !onUpdateLecture && !onDeleteLecture )
        return <div><i className="fa fa-file-movie-o" /> {item.name}</div>;
        return (
            <Dropdown
                overlay={ LectureMenu(item.id) }
                onContextMenu={event=>event.stopPropagation()}
                trigger={['contextMenu']}
            >
                <div><i className="fa fa-file-movie-o" /> {item.name}</div>
            </Dropdown>
        )
    }

    function TestMenu(testId) {
        return (
            <Menu onClick={(event) => {event.domEvent.stopPropagation()}}>
            {
                onUpdateTest &&
                <Menu.Item key="1">
                    <a onClick={()=>{ onUpdateTest(testId) }}>
                        Update test
                    </a>
                </Menu.Item>
            }
            {
                onDeleteTest &&
                <Menu.Item key="2">
                    <a onClick={()=>{ onDeleteTest(testId) }}>
                        Delete test
                    </a>
                </Menu.Item>
            }
            </Menu>
        )
    }

    function TestTitle(item){
        if( !onUpdateTest && !onDeleteTest )
        return <div><i className="fa fa-file-text-o" /> {item.name}</div>;
        return (
            <Dropdown
                overlay={ TestMenu(item.id) }
                onContextMenu={event=>event.stopPropagation()}
                trigger={['contextMenu']}
            >
                <div><i className="fa fa-file-text-o" /> {item.name}</div>
            </Dropdown>
        )
    }

    function AddCourseMenu() {
        if(!onAddCourse) return '';
        return (
            <Menu onClick={(event) => {event.domEvent.stopPropagation()}}>
                <Menu.Item key="1">
                    <a onClick={()=>{ onAddCourse(); }}>
                        Add course
                    </a>
                </Menu.Item>
            </Menu>
        )
    }

    return (
        <>
        {
            onAddCourse?
            <Dropdown overlay={AddCourseMenu()} trigger={['contextMenu']}>
                <Tree
                    className="flex-grow-1"
                    showLine={{showLeafIcon: false}}
                    switcherIcon={<DownOutlined />}
                    selectedKeys={[selectedKey]}
                    onSelect={onSelected}
                    treeData={courseTreeView}
                />
            </Dropdown>
            :
            <Tree
                className="flex-grow-1"
                showLine={{showLeafIcon: false}}
                switcherIcon={<DownOutlined />}
                selectedKeys={[selectedKey]}
                onSelect={onSelected}
                treeData={courseTreeView}
            />
        }
        </>
    )
}