import { FileImageFilled } from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Col, DatePicker, Form, List, message, Row, TimePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { initLoad } from "~/recoil/load";

const Order2 = ({loading, order, onFinish, onFinishFailed, totalVacations, totalText, RangePicker, CountTotal, disabledDate, locale, TextArea, Upload, props, loadingApprover, approver}) => {
  const setLoading = useSetRecoilState(initLoad);
  const [timeServer, setTimeServer] = useState(null);
  const onChange = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setTimeServer(["09:30:00", "17:00:00"]);
        message.success('Lấy dữ liệu thành công');
      }, 2000);
    }
  return (
    <Col xs={24} md={24} lg={24}>
      <Card bordered={false} loading={loading}>
        <h3 className="text-info">Mẫu đơn 2: {order && order.name}</h3>
        <p className="text-info" style={{ textAlign: "justify" }}>
          Mô tả: {order && order.description}
        </p>
      </Card>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
      <Card
        bordered={false}
        loading={loading}
        size="small"
        title="Chọn ngày cần khôi phục"
        extra={<DatePicker onChange={onChange} format="DD/MM/YYYY" locale={locale} />}
      >
      </Card>
      <Row style={{ maxWidth: "100%", margin: 0}} gutter={[12, 12]}>
        <Col xs={24} md={12} lg={12}>
          <Card
              style={{ maxWidth: '100%' }}
              bordered={false}
              loading={loading}
              size="small"
              title="Giờ chấm công hệ thống"
            >
              <TimePicker.RangePicker style={{ width: "100%" }} format="HH:mm" locale={locale} disabled placeholder={timeServer} />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <Card
              bordered={false}
              loading={loading}
              size="small"
              title="Giờ chấm công thực tế cần sửa"
            >
              <TimePicker.RangePicker style={{ width: "100%" }} onChange={onChange} placeholder={["Giờ checkin", "Giờ checkout"]} format="HH:mm:ss" locale={locale} />
          </Card>
        </Col>
      </Row>
        <Card
          style={{ marginTop: 10, marginBottom: 10 }}
          title={"Lý do nghỉ"}
          bordered={false}
          loading={loading}
        >
          <Form.Item
            name="lydo"
            style={{ width: "100%", border: "none" }}
            rules={[
              {
                required: true,
                message: "Vui lòng điền lý do!",
              },
            ]}
          >
            <TextArea
              className="text-area"
              placeholder="Điền lý do của bạn"
              rows={5}
            />
          </Form.Item>
        </Card>

        <Card
          style={{ marginTop: 10, marginBottom: 10 }}
          bordered={false}
          loading={loading}
        >
          <Upload
            accept="image/png, image/jpeg, image/jpg"
            {...props}
          >
            <Button
              style={{ width: "100%", border: "none" }}
              icon={<FileImageFilled style={{ color: "orange" }} />}
            >
              Thêm ảnh đính kèm (nếu có)
            </Button>
          </Upload>
        </Card>

        <Card title={"Cấp duyệt"} bordered={false} loading={loadingApprover}>
          <List
            itemLayout="horizontal"
            dataSource={approver}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    item.avatar ? (
                      <Avatar src={item.avatar} />
                    ) : (
                      <Avatar style={{ backgroundColor: "#f56a00" }}>
                        {item.fullname[0]}
                      </Avatar>
                    )
                  }
                  title={<a href="/">{item.fullname}</a>}
                  description={item.position}
                />

                <div>
                  {item.required_leader === 1 ? (
                    <Badge.Ribbon
                      className="first-reviewer"
                      text="Người duyệt đầu"
                    ></Badge.Ribbon>
                  ) : null}
                </div>
              </List.Item>
            )}
          />
        </Card>

        <Button
          className="btn btn-submit"
          type="primary"
          htmlType="submit"
          block
          disabled={loading}
        >
          Gửi đơn
        </Button>
      </Form>
    </Col>
  );
};

export default Order2;
