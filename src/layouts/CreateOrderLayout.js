import { MoreOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  Dropdown,
  PageHeader,
  Radio,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";

const CreateOrderLayout = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    document.title = "Tạo đơn";
    // call API data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const DropdownMore = () => (
    <Dropdown
      key="more"
      overlay={<a onClick={() => setVisible(true)}>Báo cáo</a>}
      placement="bottomRight"
    >
      <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
    </Dropdown>
  );

  return (
    <div className="wr-container CreateOrder">
      <PageHeader
        ghost={false}
        title="Tạo đơn"
      />
      <Outlet />
    </div>
  );
};
export default CreateOrderLayout;
