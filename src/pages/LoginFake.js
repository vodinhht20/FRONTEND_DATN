import { Button, Card, message, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { useSetRecoilState } from "recoil";
import { GetDataFake, Logout } from "~/api/BaseAPI";
import { initAccessToken } from "~/recoil/accessToken";
import { GoogleLogin } from 'react-google-login';

const LoginFake = () => {
  const [data, setData] = useState([]);
  const setAccessToken = useSetRecoilState(initAccessToken);

  const clearData = () => {
    setData([]);
  };

  const GetDataFakeFunc = () => {
    GetDataFake()
    .then(({ data }) => {
        console.log(data);
        setData(data.payload.data)
        message.success('Lấy data thành công');
    })
    .catch((error) => console.log('error get data', error));
  }

  const LogoutFunc = () => {
    Logout()
    .then(( ) => {
      reactLocalStorage.clear();
      setAccessToken('');
    })
    .then(() => {
      message.success('Đã đăng xuất');
    })
    .catch((error) => message.warning(error.response.data.message))
  }

  const responseGoogle = (response) => {
    console.log(response);
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
        <Button type="primary" onClick={GetDataFakeFunc}>Lấy dữ liệu</Button>
        <Button type="primary" onClick={clearData}>Clear Data</Button>
        <Button type="primary" onClick={LogoutFunc}>Thoát</Button>
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <Link to={"/"}><Button type="primary">Login</Button></Link>
        {data && <Table dataSource={data} columns={columns} />}
      </Card>
    </div>
  );
};

export default LoginFake;
