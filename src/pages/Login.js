import { Button, Form, Input, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { initAccess_token } from "~/recoil/access_token";
import { LoginApi } from "~/api/BaseAPI";
import "~/assets/css/loading.css";
import "~/assets/css/firefly.css";
import {
  CodeSandboxCircleFilled,
  FacebookFilled,
  GithubFilled,
  GoogleCircleFilled,
} from "@ant-design/icons";

const Login = () => {
  const setAccess_token = useSetRecoilState(initAccess_token);
  let navigate = useNavigate();
  const onFinish = (values) => {
    document.querySelector(".mask").classList.add("active");
    LoginApi(values)
      .then(({ data }) => {
        setAccess_token(data);
      })
      .then(() => message.success("Đăng nhập thành công"))
      .then(() => navigate("/"))
      .catch((error) => {
        setTimeout(() => {
            document.querySelector(".mask").classList.remove("active");
            return message.warning(error.response.data.message);
        },5000);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login">
      <div className="bg">
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
        <div className="firefly"></div>
      </div>

      <div class="mask">
        <div class="loader"></div>
      </div>

      <Card className="form-login">
        <h3 className="title">Đăng nhập</h3>
        <Form
          className="form-small"
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng điền email!",
              },
            ]}
          >
            <Input className="input-login" placeholder="Nhập email của bạn" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng điền mật khẩu!" }]}
          >
            <Input.Password
              className="input-login"
              placeholder="Nhập mật khẩu của bạn"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Link to={"/"} style={{ float: "right" }}>
              Quên mật khẩu?
            </Link>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="btn btn-login" type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>

          <Form.Item className="or-login" wrapperCol={{ offset: 8, span: 16 }}>
            <span>Hoặc đăng nhập với</span>
            <div className="social">
              <a href={"#"}>
                <GoogleCircleFilled className="icon" />
              </a>
              <a href={"#"}>
                <GithubFilled className="icon" />
              </a>
              <a href={"#"}>
                <CodeSandboxCircleFilled className="icon" />
              </a>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
