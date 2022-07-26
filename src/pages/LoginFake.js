import { Button, Card, message, notification, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { useSetRecoilState } from "recoil";
import { GetDataFake } from "~/api/BaseAPI";
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
    .catch((error) => {
      console.log('error get data', error);
      notification['info']({
        message: 'Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại'
      });
      setAccessToken("");
      reactLocalStorage.clear();
    });
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
        {data && <Table dataSource={data} columns={columns} />}
      </Card>
    </div>
  );
};

export default LoginFake;
