import {
  CheckCircleOutlined,
  FileZipOutlined,
  HomeOutlined,
  MenuOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";

const MenuBottom = () => {
  return (
    <div className="menu-bottom">
      <NavLink to={"/"}>
        <HomeOutlined />
        <span>Trang chủ</span>
      </NavLink>
      <NavLink to={"/thongke"}>
        <PieChartOutlined />
        <span>Thống kê</span>
      </NavLink>
      <NavLink to={"/donhang"}>
        <FileZipOutlined />
        <span>Đơn hàng</span>
      </NavLink>
      <NavLink to={"/cham-cong"}>
        <CheckCircleOutlined />
        <span>Chấm công</span>
      </NavLink>
      <NavLink to={"/"}>
        <MenuOutlined />
        <span>Thêm</span>
      </NavLink>
    </div>
  );
};

export default MenuBottom;
