import {
  FileTextOutlined,
  MoreOutlined,
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
  Dropdown,
  message,
  PageHeader,
  Popconfirm,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../commons/css/avatar-style.css";
import iconSetting from "../../commons/images/icons-svg/setting.svg";
import iconFile from "../../commons/images/icons-svg/file.svg";
import iconShare from "../../commons/images/icons-svg/share.svg";
import iconPlus from "../../commons/images/icons-svg/plus.svg";
const style = {
  textAlign: "center",
  marginBottom: "8vw",
};

const key = "updatable";

const More = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="more">
      <Row gutter={[12, 12]}>
        <Col xs={24} md={24} lg={24}>
          <Card title="Được đề xuất" bordered={true} loading={loading}>
            <Row gutter={[12, 12]}>
              <Col xs={6} md={6} lg={4} onClick={showDrawer}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconSetting} />
                  <p>Cài đặt</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Link to={"create-order"}>
                  <Badge count={"News"}>
                    <Avatar className="icon-app-style" src={iconFile} />
                    <p>Tạo đơn</p>
                  </Badge>
                </Link>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconShare} />
                  <p>Chia sẻ</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} md={24} lg={24}>
          <Card title="Chức năng thường dùng" bordered={true} loading={loading}>
            <Row gutter={[12, 12]}>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} md={24} lg={24}>
          <Card title="Hoạt động phần thưởng" bordered={true} loading={loading}>
            <Row gutter={[12, 12]}>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconPlus} />
                  <p>Example</p>
                </Badge>
              </Col>
            </Row>
          </Card>
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
