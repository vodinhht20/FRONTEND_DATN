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
  Avatar, 
  Button,
  Tag,
  Spin
} from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, SearchOutlined,SyncOutlined,UserOutlined, WarningOutlined  } from "@ant-design/icons";
// import { useState } from "react";
import './GiaoDienDonTu.css'
import { useRecoilState, useRecoilValue } from "recoil";
import { initProfile } from "~/recoil/profile";
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { initSingleWordList } from "~/recoil/atom";
import { useEffect, useState } from "react";
import { singleWordPesonalList } from "~/api/BaseAPI";
import { formatDate } from "~/commons/formatDate";

const Checkin = () => {
  const profileData = useRecoilValue(initProfile);
  const [singleWordList, setSingleWordList] = useRecoilState(initSingleWordList);
  const [singleLoading, setSingleLoading] = useState(true);

  useEffect(() => {
    singleWordPesonalList([])
    .then(({ data }) => {
      setSingleWordList(data.data);
      setSingleLoading(false);
    })
  }, []);

  const columns = [
    {
      title: "STT",
      width: 10,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã đơn",
      width: 15,
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return <Tag color="cyan">#{id}</Tag>
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 30,
      render: (status, record) => (
        <div>
          {record.statusInt === 1 && <Tag className="trangThaiDon" icon={<SyncOutlined spin />} color="processing"> {record.status} </Tag>}
          {record.statusInt === 2 && <Tag className="trangThaiDon" icon={<ClockCircleOutlined spin />} color="default"> {record.status} </Tag>}
          {record.statusInt === 3 && <Tag className="trangThaiDon" icon={<CheckCircleOutlined />} color="success"> {record.status} </Tag>}
          {record.statusInt === 4 && <Tag className="trangThaiDon" icon={<CloseCircleOutlined />} color="error"> {record.status} </Tag>}
          {record.statusInt === 0 && <Tag className="trangThaiDon" icon={<WarningOutlined />} color="warning"> {record.status} </Tag>}
        </div>
      ),
    },
    {
      title: "Lý do",
      dataIndex: "content",
      key: "content",
      width: 80,
      render: (text, record) => (
        <div>
          {" "}
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Thời gian tạo",
      dataIndex: "timeToCreate",
      key: "timeToCreate",
      width: 30,
    },
    {
      title: "Thời gian áp dụng",
      dataIndex: "timeToApply",
      key: "timeToApply",
      width: 45,
      render: (_, record) => (
        <div>
          {" "}
          <p>Bắt đầu: <strong>{record.thoiGianBatDau}</strong></p>
          <p>Kết thúc: <strong>{record.thoiGianKetThuc}</strong></p>
        </div>
      ),
    }
  ];

  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const onFinish = (values) => {
    setSingleLoading(true);
    singleWordPesonalList({...values, 'date': values.date ? formatDate(values.date, 'YYYY-MM-DD') : ''})
    .then(({ data }) => {
      setSingleWordList(data.data);
      setSingleLoading(false);
    })
  };

  const onFinishFailed = (errorInfo) => {
    setSingleLoading(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="wr-container home-page">
      <Card>
        <h2>
          <strong className="title-singleword">DANH SÁCH ĐƠN TỪ CỦA: { profileData && profileData?.fullname }</strong>
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
            <Form.Item name="search">
              <Input
                placeholder="Nhập nội dung bạn muốn tìm kiếm"
                suffix={<SearchOutlined />}
              />
            </Form.Item>
          </div>

          <Row gutter={[12, 12]}>
            <Col xs={24} sm={10} lg={10}>
              <span ><strong>Trạng thái</strong> </span>
              <Form.Item name="status">
                <Select defaultValue="">
                  <Option value="">---All---</Option>
                  <Option value="1">Đơn đang xử lý</Option>
                  <Option value="2">đơn đã được duyệt bởi leader</Option>
                  <Option value="3">Đơn đã được duyệt</Option>
                  <Option value="4">Đơn bị từ chối</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={10} lg={10}>
              <span ><strong>Thời gian tạo</strong> </span>
              <Form.Item name="date">
                <DatePicker allowClear locale={locale} style={{ width: "100%" }} picker="month" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={4} lg={4} style={{ display: "flex", alignItems: "center" }}>
              <Button style={{ width: "100%", margin: "auto" }} type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Form>

        <span >Có <strong>{singleWordList && singleWordList?.length}</strong> đơn từ trong danh sách</span>
        <Spin spinning={singleLoading}>
          <Table
          className="timeTo"
            columns={columns}
            dataSource={singleWordList}
            pagination={{ pageSize: 3 }}
            bordered
            scroll={{
              x: 1500,
              y: 1300,
            }}
          />
        </Spin>
      </Card>
    </div>
  );
};

export default Checkin;
