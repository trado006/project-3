import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Switch, message } from 'antd';

import API from '../../util/api';

// Student info: loginName, fullName, phone, email, gender, birthday, hometown
export default function TeacherTable() {
    const [data, setData] = useState([]);
    const columns = [
        // {
        //     title: 'Img',
        //     render: (_, record) =>
        //     <img src="https://joeschmoe.io/api/v1/random" className="rounded-circle user_img"></img>
        // },
        {title: 'Login name',dataIndex: 'login_name',},
        {title: 'Full nme',dataIndex: 'full_name',},
        {title: 'Phone',dataIndex: 'phone',},
        {title: 'Email',dataIndex: 'email',},
        {title: 'Gender',dataIndex: 'gender',
            filters: [
                {text: 'male',value: 'male',},
                {text: 'female',value: 'female',},
                {text: 'other',value: 'other',},
            ],
            onFilter: (value, record) => record.gender.indexOf(value) === 0,
        },
        {title: 'Birthday',dataIndex: 'birthday',},
        {title: 'Hometown',dataIndex: 'hometown',},
        {
            title: 'Active',
            render: (_, record) => {return <Switch key={record.id} checked={record.active} 
            onChange={(checked)=> onChange(checked, record.id)} /> },
        },
        {
            title: 'Del',
            render: (_, record) =>
            data.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                <a href="#">Del</a>
                </Popconfirm>
            ) : null,
        },
    ];
    const getRowKey = (record) => {
        return record.id;
    }

    useEffect(()=>{
        API.get('teachers')
        .then((res)=>{
            setData(res.data.teachers);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        API.get(`teachers/search/${data.search_input.value}`)
        .then((res)=>{
            if(res.data.error_code){
                message.error('view detail error in console');
                console.log(res.data);
                return;
            }
            setData(res.data.teachers);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const onChange = (checked, id) => {
        console.log(`switch to ${checked} and ${id}`);
        if(!checked){
            API.put(`inactive-teacher/${id}`)
            .then((res)=>{
                if(res.data.error_code){
                    message.error('Inactive teacher fails');
                    return;
                }
                message.success('Inactive teacher is okey');
                setData(data.map((item)=>{
                    if(item.id == id){
                        item.active = checked;
                    }
                    return item;
                }));
            })
            .catch((err)=>{
                console.log(err);
                message.error('Request error: view more in console');
            })
        }else{
            API.put(`active-teacher/${id}`)
            .then((res)=>{
                if(res.data.error_code){
                    message.error('Active teacher fails');
                    return;
                }
                message.success('Active teacher is okey');
                setData(data.map((item)=>{
                    if(item.id == id){
                        item.active = checked;
                    }
                    return item;
                }));
            })
            .catch((err)=>{
                console.log(err);
                message.error('Request error: view more in console');
            })
        }
        
    }

    const handleDelete = (id) => {
        API.delete(`user/${id}`)
        .then((res)=>{
            if(res.data.error_code){
                message.error(res.data.msg);
                return;
            }
            setData(data.filter((item)=>{item.id != id}));
        })
        .catch(()=>{
            message.error('Request error: view detail in console');
            console.log(err);
        })
    };

    return (
        <>
        <div className="d-flex flex-row mb-1" style={{height: '32px'}}>
            <h2 className="flex-grow-1 m-0">Teacher Info Table</h2>
            <form  className="d-flex flex-row" onSubmit={onSubmit}>
                <input type="text" className="form-control rounded-0 me-2" name="search_input" placeholder="Input text to search" />
                <button type="submit" className="rounded-0 bg-primary border-0 text-white px-3">Search</button>
            </form>
        </div>
        <Table className="teacher-table" 
        columns={columns} rowKey={getRowKey}
        expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.introduction}</p>,
        }}
        dataSource={data} bordered />
        </>
    );
}