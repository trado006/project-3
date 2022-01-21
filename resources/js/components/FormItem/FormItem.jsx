import { Form, Button, Input, DatePicker, Select, Checkbox } from 'antd';
const { Option } = Select;

function Title({ style, value }){
    return (
        <h2 style={ style? style:{textAlign:'center'} }>{value}</h2>
    )
}

function LoginName() {
    return (
    <Form.Item
        name="login_name"
        label="Login name"
        rules={[
        {
            required: true,
            message: 'Please input your Login name!',
            whitespace: false,
        },
        ]}
    >
        <Input />
    </Form.Item>
    )
}

function Password(){
    return (
    <Form.Item
        name="password"
        label="Password"
        rules={[
        {
            required: true,
            message: 'Please input your password!',
        },
        ]}
        hasFeedback
    >
        <Input.Password />
    </Form.Item>
    )
}

function ConfirmPassword() {
    return (
        <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
            }),
            ]}
        >
            <Input.Password />
        </Form.Item>
    )
}

function FullName() {
    return (
        <Form.Item
            name="full_name"
            label="Nick name"
            tooltip="What do you want others to call you?"
            rules={[
            {
                required: true,
                message: 'Please input your nickname!',
                whitespace: false,
            },
            ]}
        >
            <Input />
        </Form.Item>
    )
}

function Phone() {
    return (
        <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
            {
                required: true,
                message: 'Please input your phone number!',
            },
            ]}
        >
            <Input />
        </Form.Item>
    )
}

function Email(){
    return (
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
            {
                type: 'email',
                message: 'The input is not valid E-mail!',
            },
            {
                required: true,
                message: 'Please input your E-mail!',
            },
            ]}
        >
            <Input />
        </Form.Item>
    )
}

function Gender() {
    return (
        <Form.Item
            name="gender"
            label="Gender"
            rules={[
            {
                required: true,
                message: 'Please select gender!',
            },
            ]}
        >
            <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
            </Select>
        </Form.Item>
    )
}

function Birthday() {
    return (
        <Form.Item
            name="birthday"
            label="Birthday"
            rules={[
            {
                required: true,
                message: 'Please input your birthday!',
            },
            ]}
        >
            <DatePicker />
        </Form.Item>
    )
}

function Hometown() {
    return (
        <Form.Item
            name="hometown"
            label="Hometown"
            rules={[
            {
                required: true,
                message: 'Please input your hometown!',
                whitespace: true,
            },
            ]}
        >
            <Input />
        </Form.Item>
    )
}

function Introduction() {
    return (
        <Form.Item
            name="introduction"
            label="Intro"
            rules={[
            {
                required: true,
                message: 'Please input Intro',
            },
            ]}
        >
            <Input.TextArea showCount />
        </Form.Item>
    )
}

function RememberCheckbox(){
    return (
        <Form.Item
            name="remember"
            valuePropName="checked"
            style={{textAlign:'left'}}
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item>
    )
}

function SubmitButton({value}) {
    return (
        <Form.Item>
            <Button
            style={{width:'100%', textAlign:'center'}}
            type="primary" htmlType="submit">
            {value? value: 'Submit'}
            </Button>
        </Form.Item>
    )
}

export default { Title, LoginName, Password, ConfirmPassword, FullName, Phone, Email,
                Gender, Birthday, Hometown, Introduction, RememberCheckbox, SubmitButton };