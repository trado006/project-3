import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { LoginStart } from "../../context/AuthActions";
import { Menu, Dropdown, Avatar, message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import ProfileModal from "./ProfileModal";

import API from '../../util/api';

import "./topbar.css";

export default function App({ style, choose }) {
    const { user, dispatch } = useContext(AuthContext);
    const [isLogout, setIsLogout] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [avatar, setAvatar] = useState('');
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

    const position = user.position;
    useEffect( ()=>{
        if(user){
            console.log(user);
            API.get('/my-info')
            .then(function (res) {
                switch (res.data["error_code"]) {
                    case 0:
                        console.log(res.data.user.full_name);
                        setUserInfo(res.data.user);
                        setAvatar(res.data.user.avatar);
                        break;
                    case 2:
                        message.warning(res.data.msg);
                        break;
                }
            })
            .catch((error) => {
                message.error("Request error: view detail in console");
                console.log(error);
            });
        }
    }, []);
    var menu = [];
    var url = [];
    if (position == "admin") {
        menu = ['Courses', 'Students', 'Teachers'];
        url = ['/admin/courses', '/admin/students', '/admin/teachers'];
    } else if (position == "teacher") {
        menu = ['My courses'];
        url = ['/teacher/my-courses']
    } else if (position == "student") {
        menu = ['Home', 'My courses'];
        url = ['/', '/my-courses'];
    } else {
        menu = ["Home", "Login", "Register"];
        url = ['/', '/login', 'register'];
    }

    const UserOptionList = (position) => {
        return (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={()=>{setIsProfileModalVisible(true)}} >Profile</a>
                </Menu.Item>
                <Menu.Item disabled key="1">
                    <Link to={"/" + position + "/update"}>Update</Link>
                </Menu.Item>
            </Menu>
        );
    }

    const logout = () => {
        localStorage.clear();
        dispatch(LoginStart());
        setIsLogout(true);
    }

    return (
        <>
        {isLogout? <Navigate to='/' />: null}
        {isProfileModalVisible ?
            <ProfileModal avatar={avatar} setAvatar={setAvatar}
                setIsModalVisible={setIsProfileModalVisible} />
            :null
        }
        <div className="TopBar" style={style}>
            <div className="logo">
                <div>E-learning</div>
            </div>

            <div className="d-flex">
                <Menu
                className="flex-grow-1"
                mode="horizontal" defaultSelectedKeys={[choose]}>
                    {menu.map((item, index) => (
                        <Menu.Item key={item}>
                            <Link to={url[index]}>
                                {item}
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu>
                <div className="me-3">
                    <Dropdown
                        overlay={ (user.position&&user.position!='admin') ? UserOptionList(position) : "" }
                        placement="bottomRight"
                    >
                        <Dropdown.Button
                            overlay=""
                            icon={
                                avatar?
                                <img src={avatar} style={{width: '26px', height: '26px', objectFit: 'cover'}} />
                                : <UserOutlined style={{ fontSize: "26px", color: "#08c" }} />
                            }
                        >
                            {userInfo.full_name || "Guest"}
                        </Dropdown.Button>
                    </Dropdown>
                </div>
                <div className="me-3 d-flex justify-align-center align-items-center">
                    <i className="fa fa-sign-out text-danger" style={{fontSize: '24px'}} onClick={logout}></i>
                </div>
            </div>
        </div>
        </>
    );
}

/*
<Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
    Dropdown
</Dropdown.Button>

<a style={{display:'inline-block',position:'absolute',top:'0px',right:'0px'}} onClick={e => e.preventDefault()}>
    {this.props.username||'Guest'} <UserOutlined style={{ fontSize: '24px', color: '#08c' }} />
</a>



let pathName = window.location.pathname;
        console.log(pathName);
        let parts = pathName.split('/');
        let position = parts[1];
*/
