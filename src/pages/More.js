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
import { reactLocalStorage } from "reactjs-localstorage";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import "~/assets/css/avatar-style.css";
import { iconSetting, iconFile, iconShare, iconPlus, iconLocation2, iconDocument} from "~/components/images";
import { initLoad } from "~/recoil/load";
import { initSettingDefault } from "~/recoil/settingDefault";

const key = "updatable";

const More = () => {
  const loading = useRecoilValue(initLoad);
  const [setting, setSettingDefault] = useRecoilState(initSettingDefault);
  const resetSettingDefault = useResetRecoilState(initSettingDefault);

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

  //setting
  const backgroundBottom = (e) => {
    setSettingDefault({
      ...setting,
      'backgroundBottom': e.target.value,
    });
    reactLocalStorage.setObject("backgroundColor", {
      ...setting,
      'backgroundBottom': e.target.value,
    })
  };

  const backgroundHead = (e) => {
    setSettingDefault({
      ...setting,
      'backgroundHead': e.target.value,
    });
    reactLocalStorage.setObject("backgroundColor", {
      ...setting,
      'backgroundHead': e.target.value,
    })
  };

  function confirm(e) {
    reactLocalStorage.remove("backgroundColor");
    resetSettingDefault();
    message.success("Đã reset về mặc định");
  }

  //setting

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
              <Badge count={""}>
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
        <Badge.Ribbon text="Design cá nhân">
          <Card title="Cài đặt Design" size="small">
            Vui lòng chọn màu menu header
            <p>
              <input
                onChange={(e) => backgroundHead(e)}
                style={{ width: "100%", border: "none" }}
                type="color"
                value={setting.backgroundHead}
              ></input>
            </p>
            Vui lòng chọn màu footer Bottom
            <p>
              <input
                onChange={(e) => backgroundBottom(e)}
                style={{ width: "100%", border: "none" }}
                type="color"
                value={setting.backgroundBottom}
              ></input>
            </p>
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
          </Card>
        </Badge.Ribbon>
      </Drawer>
    </div>
  );
};
export default More;
