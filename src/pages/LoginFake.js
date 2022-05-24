import { Button, Card, Checkbox, Form, Input, message } from "antd";
import { GetDataFake, Login } from "~/api/BaseAPI";

const LoginFake = () => {
  const onFinish = (values) => {
    // console.log("Success:", values);
    Login(values)
    .then(({ data }) => {
      localStorage.setItem("user", JSON.stringify(data));
    })
    .then(() => message.success('Đăng nhập thành công'))
    .catch((error) => message.warning(error.response.data.message));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const GetDataFakeFunc = () => {
    let accessToken;
    if (JSON.parse(localStorage.getItem("user"))) {
        accessToken = 'Bearer '+ JSON.parse(localStorage.getItem("user")).access_token;
    }
    GetDataFake({ headers: { Authorization: accessToken } })
    .then(({ data }) => {
        console.log(data);
        message.success('Lấy data thành công');
    })
    .catch((error) => message.warning(error.response.data.message));
  }

  return (
    <div className="wr-container home-page">
      <Card className="section-content">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={GetDataFakeFunc}>Lấy dữ liệu</Button>
      </Card>
    </div>
  );
};

export default LoginFake;
