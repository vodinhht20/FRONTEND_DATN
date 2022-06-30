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
import { useRecoilValue } from "recoil";
import "~/assets/css/avatar-style.css";
import { iconSetting, iconFile, iconShare, iconPlus, iconLocation2, iconDocument} from "~/components/images";
import { initLoad } from "~/recoil/load";

const key = "updatable";

const More = () => {
  const loading = useRecoilValue(initLoad);

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
    <div className="wr-container more">
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
                <Badge count={""} onClick={openMessage}>
                  <Avatar className="icon-app-style" src={iconShare} />
                  <p>Chia sẻ</p>
                </Badge>
              </Col>
              <Col xs={6} md={6} lg={4}>
              <Link to={"map"}>
                <Badge count={""}>
                  <Avatar className="icon-app-style" src={iconLocation2} />
                  <p>Vị trí hiện tại</p>
                </Badge>
              </Link>
              </Col>
              <Col xs={6} md={6} lg={4}>
              <Link to={"hosonhansu"}>
              <Badge count={"News"}>
                  <Avatar className="icon-app-style" src={iconDocument} />
                  <p>Hồ sơ nhân sự</p>
                </Badge>
              </Link>
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
