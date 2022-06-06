import { Button, Form, Input, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { initAccessToken } from "~/recoil/accessToken";
import { LoginApi,LoginGG } from "~/api/BaseAPI";
import "~/assets/css/firefly.css";
import { useEffect, useState } from "react";
import Loading from "~/components/Global/Loading";
import moment from "moment";
import { reactLocalStorage } from "reactjs-localstorage";
import { initRoutesLogin } from "~/recoil/routesLogin";
import GoogleLogin from "react-google-login";
import axios from "axios";

const Login = () => {
  // const handelLogout =()=>{
  //   localStorage.removeItem('loginData');
  //   setLoginData(null)
  // }
  // const [loginData, setLoginData]= useState(
  //   localStorage.getItem('loginData')?JSON.parse(localStorage.getItem('loginData')):null
  // )

  const [loading, setLoading] = useState("");
  const [checkTimeBG, setCheckTimeBG] = useState("light");
  const setAccessToken = useSetRecoilState(initAccessToken);
  const setRoutesLogin = useSetRecoilState(initRoutesLogin);
  let navigate = useNavigate();

  // login google
  const handleFailure = (result) =>{
    console.log('loi:',result )
  }
  const handleLogin = (googleData)=>{
    let tokenId = googleData.tokenId
    LoginGG(tokenId)
      .then((res)=>{
        const accessToken = res.data.access_token;
        reactLocalStorage.set('access_token', accessToken);
        setAccessToken(accessToken);
        setRoutesLogin(true);
      })
      .then(() => message.success("Đăng nhập thành công"))
      .then(() => navigate("/"))
      .catch((error) => {
        setTimeout(() => {
          setLoading("");
          return message.warning(error.response.data.message);
        }, 5000);
      });
  }
  // login google
  
  const onFinish = (values) => {
    setLoading("active");
    LoginApi(values)
      .then(({ data }) => {
        const accessToken = data.access_token;
        reactLocalStorage.set('access_token', accessToken);
        setAccessToken(accessToken);
        setRoutesLogin(true);
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
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Đăng nhập với Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
