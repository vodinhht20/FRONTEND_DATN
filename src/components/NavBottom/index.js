import {
  AppstoreFilled,
  CheckCircleFilled,
  HomeFilled,
  PieChartFilled,
  ScheduleFilled,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { Row, Col } from "antd";
import { initSettingDefault } from "~/recoil/settingDefault";
import { useRecoilValue } from "recoil";

const MenuBottom = () => {
  const settingDefault = useRecoilValue(initSettingDefault);
  return (
    <Row justify="center" className="nav-bottom" style={{backgroundColor: settingDefault.backgroundBottom}}>
      <Col xs={22} md={20} lg={18} className="wr-container wrap-item">
        <NavLink to={"/"} className="nav-item">
          <HomeFilled />
          <span className="text-nav">Trang chủ</span>
        </NavLink>
        <NavLink to={"/bang-cong"} className="nav-item">
          <ScheduleFilled />
          <span className="nav-name">Bảng công</span>
        </NavLink>
        <NavLink to={"/cham-cong"} className="nav-item">
          <CheckCircleFilled />
          <span className="nav-name">Chấm công</span>
        </NavLink>
        <NavLink to={"/thong-ke"} className="nav-item">
          <PieChartFilled />
          <span className="nav-name">Thống kê</span>
        </NavLink>
        <NavLink to={"/more"} className="nav-item">
          <AppstoreFilled />
          <span className="nav-name">Thêm</span>
        </NavLink>
      </Col>
    </Row>
  );
};

export default MenuBottom;
