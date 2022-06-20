import {
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Table,
  Row,
  Col,
  Card,
  Avatar 
} from "antd";
import { SearchOutlined,UserOutlined  } from "@ant-design/icons";
// import { useState } from "react";
import './GiaoDienDonTu.css'

const Checkin = () => {
  //   const [state, setState] = useState("hello world");

  const columns = [
    {
      title: "STT",
      width: 40,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã đơn",
      width: 50,
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Loại đơn",
      dataIndex: "type",
      key: "type",
      width: 150,
      render: (text, record) => (
        <div>
          {" "}
          <p>{text}</p>
          <p className="trangThaiDon">{record.status}</p>
          <p className="lyDoTuChoi">{record.reason}</p>
        </div>
      ),
    },
    {
      title: "Người tạo",
      dataIndex: "createBy",
      key: "createBy",
      width: 100,
      render: (text, record) => (
        <div>
          {" "}
          <p>{text}</p>
          <p>{record.DonVi}</p>
          <p className="ViTri">{record.ViTri}</p>
        </div>
      ),
    },
    {
      title: "Thời gian tạo",
      dataIndex: "timeToCreate",
      key: "timeToCreate",
      width: 70,
    },
    {
      title: "Thời gian áp dụng",
      dataIndex: "timeToApply",
      key: "timeToApply",
      width: 150,
      render: (_, record) => (
        <div>
          {" "}
          <p>Bắt đầu nghỉ:<strong>{record.thoiGianBatDau}</strong></p>
          <p>Kết thúc nghỉ:<strong>{record.thoiGianKetThuc}</strong></p>
        </div>
      ),
    },
    {
      title: "người theo dõi",
      dataIndex: "followBy",
      key: "followBy",
      width: 80,
      render:()=>(
        <Avatar icon={<UserOutlined />} />
        
      )
    },
    {
      title: "Action",
      key: "operation",
      width: 60,
      render: () => ( <p>action</p>),
    },
  ];
  const data = [
    {
      stt: "1",
      id: "#6037",
      type: "Đơn nghỉ không lương",
      status: "Đã hủy bỏ",
      reason: "Hệ thống hủy đơn do quá hạn chốt đơn",
      createBy: "Võ Văn Định",
      DonVi: "FPT",
      ViTri: "Sofware Engineer",
      timeToCreate:"09/05/2022",
      thoiGianBatDau:'10/02/2022',
      thoiGianKetThuc:'10/05/2022'
    },
  ];

  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="wr-container home-page">
      {/* <h2>{state}</h2>
      <Button onClick={() => setState("change State suss")}>changeState</Button> */}

      <Card>
        <h2>
          <strong>DANH SÁCH ĐƠN TỪ</strong>
        </h2>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>
            <Form.Item name="username">
              <Input
                placeholder="Nhập nội dung bạn muốn tìm kiếm"
                suffix={<SearchOutlined />}
              />
            </Form.Item>
          </div>

          <Row gutter={[12, 12]}>
            <Col xs={24} sm={12} lg={6}>
              {" "}
              <Form.Item name="password">
                <Select defaultValue="">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              {" "}
              <Form.Item name="password">
                <Select defaultValue="">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              {" "}
              <Form.Item name="password">
                <Select defaultValue="">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              {" "}
              <Form.Item name="password">
                <Select defaultValue="">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col sm={24} lg={8}>
              <Form.Item>
                <span ><strong>Thời gian tạo đơn</strong> </span>
                <Space direction="vertical" size={12} className="timeTo">
                  <RangePicker />
                </Space>
              </Form.Item>
            </Col>
            <Col sm={24} lg={8}>
              <Form.Item>
                <span ><strong>Thời gian áp dụng</strong> </span>
                <Space direction="vertical" size={12} className="timeTo">
                  <RangePicker />
                </Space>
              </Form.Item>
            </Col>
            <Col sm={24} lg={8}>
              {/* <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item> */}
            </Col>
          </Row>
        </Form>
        <span >Có <strong>1</strong> đơn từ trong danh sách</span>
        <Table
        className="timeTo"
          columns={columns}
          dataSource={data}
          bordered
          scroll={{
            x: 1500,
            y: 1300,
          }}
        />
      </Card>
    </div>
  );
};

export default Checkin;
