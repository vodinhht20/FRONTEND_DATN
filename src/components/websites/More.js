import {
  FileTextOutlined,
  QrcodeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Drawer,
  message,
  Popconfirm,
  Row,
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../commons/css/avatar-style.css";
const style = {
  textAlign: "center",
  marginBottom: "8vw",
};

const key = "updatable";

const More = () => {
  let navigate = useNavigate();

  const openMessage = () => {
    message.loading({ content: "Loading...", key });
    setTimeout(() => {
      message.warning({
        content: "Chức năng đang được xây dựng",
        key,
        duration: 2,
      });
    }, 2000);
  };

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const backgroundColor = (e) => {
    setTimeout(() => {
      localStorage.setItem("backgroundColor", e.target.value);
    }, 2000);
  };

  function confirm(e) {
    console.log(e);
    message.success("Đã reset về mặc định");
    localStorage.removeItem("backgroundColor");
  }

  return (
    <div className="more">
      <Row gutter={16}>
        <Col style={style} className="gutter-row" span={6} onClick={showDrawer}>
          <Avatar
            shape="square"
            className="icon-app-style"
            icon={<SettingOutlined />}
          />
        </Col>
        <Col style={style} className="gutter-row" span={6}>
          <Avatar
            shape="square"
            className="icon-app-style"
            icon={<QrcodeOutlined />}
            onClick={openMessage}
          />
        </Col>
        <Col style={style} className="gutter-row" span={6}>
          <Link to={"create-order"}>
            <Avatar
              shape="square"
              className="icon-app-style"
              icon={<FileTextOutlined />}
            />
          </Link>
        </Col>
        <Col style={style} className="gutter-row" span={6}>
          <Avatar
            shape="square"
            className="icon-app-style"
            icon={<UserOutlined />}
            onClick={openMessage}
          />
        </Col>
        <Col style={style} className="gutter-row" span={6}>
          <Avatar
            shape="square"
            className="icon-app-style"
            icon={<UserOutlined />}
            onClick={openMessage}
          />
        </Col>
        <Col style={style} className="gutter-row" span={6}>
          <Avatar
            shape="square"
            className="icon-app-style"
            icon={<UserOutlined />}
            onClick={openMessage}
          />
        </Col>
        <Col style={style} className="gutter-row" span={6}>
          <Avatar
            shape="square"
            className="icon-app-style"
            icon={<UserOutlined />}
            onClick={openMessage}
          />
        </Col>
        <Col style={style} className="gutter-row" span={6}>
          <Avatar
            shape="square"
            className="icon-app-style"
            icon={<UserOutlined />}
            onClick={openMessage}
          />
        </Col>
      </Row>

      <Drawer
        title="Cài đặt"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Badge.Ribbon text="Background">
          <Card title="Cài đặt background" size="small">
            Vui lòng chọn màu background muốn dùng
            <p>
              <input
                onChange={(e) => backgroundColor(e)}
                style={{ width: "100%", border: "none" }}
                type="color"
              ></input>
              <Popconfirm
                title="Bạn có muốn reset về mặc định không?"
                onConfirm={confirm}
                onCancel={null}
                okText="Đồng ý"
                cancelText="Hủy"
              >
                <Button
                  type="primary"
                  style={{ width: "100%", border: "none" }}
                >
                  Reset
                </Button>
              </Popconfirm>
            </p>
          </Card>
        </Badge.Ribbon>
      </Drawer>
    </div>
  );
};
export default More;
