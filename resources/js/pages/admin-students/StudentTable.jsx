import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Menu, Dropdown, message } from 'antd';

import API from '../../util/api';

// Student info: loginName, fullName, phone, email, gender, birthday, hometown
export default function App() {
    const [data, setData] = useState();
    const columns = [
        {
            title: 'Login name',
            dataIndex: 'login_name',
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
                {
                    text: 'male',
                    value: 'male',
                },
                {
                    text: 'female',
                    value: 'female',
                },
                {
                    text: 'other',
                    value: 'other',
                },
            ],
            onFilter: (value, record) => record.gender.indexOf(value) === 0,
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
        },
        {
            title: 'Hometown',
            dataIndex: 'hometown',
        },
        {
            title: 'Operation',
            render: (_, record) =>
            data.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                <a className="text-danger">Delete</a>
                </Popconfirm>
            ) : null,
        },
    ];
    const getRowKey = (record) => {
        return record.id;
    }

    useEffect(()=>{
        API.get('students')
        .then((res)=>{
            console.log(res.data);
            setData(res.data.students);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        let data = event.target.elements;
        API.get(`students/search/${data.search_input.value}`)
        .then((res)=>{
            if(res.data.error_code){
                message.error('view detail error in console');
                console.log(res.data);
                return;
            }
            console.log(res.data.students);
            setData(res.data.students);
        })
        .catch((err)=>{
            console.log(err);
        })
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
            <h2 className="flex-grow-1 m-0">Student Info Table</h2>
            <form  className="d-flex flex-row" onSubmit={onSubmit}>
                <input type="text" className="form-control rounded-0 me-2" name="search_input" placeholder="Input text to search" />
                <button type="submit" className="rounded-0 bg-primary border-0 text-white px-3">Search</button>
            </form>
        </div>
        <Table className="student-table" columns={columns} rowKey={getRowKey} dataSource={data} bordered />
        </>
    );
}