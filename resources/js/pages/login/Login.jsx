import { useState, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LoginSuccess } from "../../context/AuthActions";
import API from "../../util/api";

import FormItem from "../../components/formitem/FormItem";
import { Form, message } from "antd";

import "./login.css";

export default function App() {
    const [logined, setLogined] = useState(false);
    const { dispatch } = useContext(AuthContext);
    let position = "";
    const onFinish = (values) => {
        console.log("Success:", values);
        let data = { ...values };
        API.post("/log-in", { ...data })
            .then(function (response) {
                console.log(response.data);
                switch (response.data["error_code"]) {
                    case 0:
                        message.success(response.data.msg);
                        //console.log(response.data.user);
                        dispatch(LoginSuccess(response.data.user));
                        //setIsFulfill(true);
                        break;
                    case 1:
                        for (const [key, value] of Object.entries(
                            response.data.error
                        )) {
                            message.warning(value);
                        }
                        break;
                    case 2:
                        message.warning(response.data.msg);
                        break;
                    default:
                        message.warning("default error break");
                        break;
                }
            })
            .catch((error) => {
                message.error("Request error: view detail in console");
                console.log(error);
            });
    };
    const onFinishFailed = (errorInfo) => {
        //console.log('Failed:', errorInfo);
        message.error("Info not valid!");
    };

    return (
        <>
            {logined && <Navigate to={"/" + position} />}

            <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center overflow-auto">
                <Form
                    className="login-form bg-white p-3 border rounded"
                    name="basic"
                    labelCol={{ span: 100 }}
                    wrapperCol={{ span: 100 }}
                    layout="vertical"
                    autoComplete="true"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <FormItem.Title value="Login Form" />
                    <FormItem.LoginName />
                    <FormItem.Password />
                    <FormItem.SubmitButton />

                    <div className="text-end">
                        <Link to="/register">Register new account</Link>
                    </div>

                    <div className="text-center">
                        <a>Forgot password</a>
                    </div>
                </Form>
            </div>
        </>
    );
}
