import { Button, Col, Row, Form, Input, Checkbox, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { imageLogin } from "~/components/images";
import { initAccess_token } from "~/recoil/access_token";
import { LoginApi } from "~/api/BaseAPI";

const styleForm = {
    marginLeft: '15px',
    marginRight: '15px',

}
const styleBackgroup = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
    display: 'flex',
    justifyContent: 'center',
    opacity: '0.8',
    backgroundImage: `url(${imageLogin})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'

}
const styleContents = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
}
const styleBody = {
    height: '100vh',
    width: "100%",
    margin: 'auto',
}
const Login = () => {
    const setAccess_token = useSetRecoilState(initAccess_token);
    let navigate = useNavigate();
    const onFinish = (values) => {
    LoginApi(values)
    .then(({ data }) => {
        setAccess_token(data);
    })
    .then(() => message.success('Đăng nhập thành công'))
    .then(() => navigate('/'))
    .catch((error) => message.warning(error.response.data.message));
    };

    const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    };
    return (
        <div style={styleBody}>
            <div style={styleBackgroup}></div>
            <div style={styleContents}>
                <Card style={{opacity:'0.9', boxShadow: '0 0 5px #000'}}>
                    <Form
                        name="basic"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={styleForm}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </ div>
    );
};
export default Login;
