import { Button, Form, Input, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { initAccess_token } from "~/recoil/access_token";
import { LoginApi } from "~/api/BaseAPI";
import "~/assets/css/firefly.css";
import {
  CodeSandboxCircleFilled,
  GithubFilled,
  GoogleCircleFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Loading from "~/components/Global/Loading";
import moment from "moment";

const Login = () => {
  const [loading, setLoading] = useState("");
  const [checkTimeBG, setCheckTimeBG] = useState("light");

  const setAccess_token = useSetRecoilState(initAccess_token);
  let navigate = useNavigate();
  const onFinish = (values) => {
    setLoading("active");
    LoginApi(values)
      .then(({ data }) => {
        setAccess_token(data);
      })
      .then(() => message.success("Đăng nhập thành công"))
      .then(() => navigate("/"))
      .catch((error) => {
        setTimeout(() => {
          setLoading("");
          return message.warning(error.response.data.message);
        }, 5000);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const format = "hh:mm:ss";
    const time = moment(new Date().toLocaleString(), format),
      beforeTime = moment("18:00:00", format),
      afterTime = moment("24:00:00", format),
      beforeTimeDAWN = moment("00:00:00", format),
      afterTimeDAWN = moment("06:00:00", format);
      console.log(time);
    if (time.isBetween(beforeTime, afterTime) || time.isBetween(beforeTimeDAWN, afterTimeDAWN)) {
      setCheckTimeBG("night");
    } else {
      setCheckTimeBG("light");
    }
  }, []);

  return (
    <div className="login">
      <div className={`bg ${checkTimeBG}`}>
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

      <Loading loading={loading} />

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
