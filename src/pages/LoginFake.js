import { Button, Card, Checkbox, Form, Input, message, Table } from "antd";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GetDataFake, LoginApi, Logout } from "~/api/BaseAPI";
import { initAccess_token } from "~/recoil/access_token";

const LoginFake = () => {
  const [data, setData] = useState([]);
  const [access_token, setAccess_token] = useRecoilState(initAccess_token);
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

  const GetDataFakeFunc = () => {
    GetDataFake(access_token)
    .then(({ data }) => {
        console.log(data);
        setData(data.payload.data);
        message.success('Lấy data thành công');
    })
    .catch((error) => message.warning(error.response.data.message));
  }

  const LogoutFunc = () => {
    Logout(access_token)
    .then(({ data }) => {
        console.log(data);
        localStorage.removeItem("user");
        setAccess_token('');
    })
    .then(() => {
        message.success('Đã đăng xuất');
        // navigate('/login');
    })
    .catch((error) => message.warning(error.response.data.message))
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    }
  ];

  return (
    <div className="wr-container home-page">
      <Card className="section-content">
        {/* <Form
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
        </Form> */}
        <Button type="primary" onClick={GetDataFakeFunc}>Lấy dữ liệu</Button>
        <Button type="primary" onClick={LogoutFunc}>Thoát</Button>
        {data && <Table dataSource={data} columns={columns} />}
      </Card>
    </div>
  );
};

export default LoginFake;
