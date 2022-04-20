import {
  CheckCircleOutlined,
  FileZipOutlined,
  HomeOutlined,
  MenuOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { Row, Col } from 'antd';

const MenuBottom = () => {
  return (
    <Row justify="center" className="nav-bottom">
      <Col xs={22} md={20} lg={18} className="wrap-item">
        <NavLink to={"/"} className="nav-item">
          <HomeOutlined />
          <span className="text-nav">Trang chủ</span>
        </NavLink>
        <NavLink to={"/thongke"} className="nav-item">
          <PieChartOutlined/>
          <span className="nav-name">Thống kê</span>
        </NavLink>
        <NavLink to={"/donhang"} className="nav-item">
          <FileZipOutlined/>
          <span className="nav-name">Đơn hàng</span>
        </NavLink>
        <NavLink to={"/cham-cong"} className="nav-item">
          <CheckCircleOutlined/>
          <span className="nav-name">Chấm công</span>
        </NavLink>
        <NavLink to={"/more"} className="nav-item">
          <MenuOutlined/>
          <span className="nav-name">Thêm</span>
        </NavLink>
      </Col>
    </Row>
  );
};

export default MenuBottom;
