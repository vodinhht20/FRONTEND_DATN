import { Button, Col, Row, Form, Input, Checkbox, Card } from "antd";
import { imageLogin } from "~/components/images";
const onFinish = () => { }
const onFinishFailed = () => { }
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
    opacity: '0.8'

}
const styleContents = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vh',
}
const styleBody = {
    height: '100vh',
    width: "100vh",
    margin: 'auto',
}
const Login = () => {
    return (
        <div style={styleBody}>
            <div style={styleBackgroup}> <img src={imageLogin}></img></div>
            <div style={styleContents}>
                <Card style={{opacity:'0.8'}}>
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
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
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
            {
                <Row style={{ width: '100%' }}>
                    <Col xs={24} md={18} lg={15} className="">
                        <div className="">
                            {


                            }
                        </div>

                    </Col>
                    <Col xs={24} md={6} lg={8}  >
                        <div className="" >
                            {


                            }
                        </div>

                    </Col>
                </Row>
            }
        </ div>
    );
};
export default Login;
