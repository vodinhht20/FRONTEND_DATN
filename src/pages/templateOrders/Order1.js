import { FileImageFilled } from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Col, Form, List } from "antd";

const Order1 = ({loading, order, onFinish, onFinishFailed, totalVacations, totalText, RangePicker, CountTotal, disabledDate, locale, TextArea, Upload, props, loadingApprover, approver}) => {
    
  return (
    <Col xs={24} md={24} lg={24}>
      <Card bordered={false} loading={loading}>
        <h3 className="text-info">Mẫu đơn 1: {order && order.name}</h3>
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
          loading={loading}
          size="small"
          title="Chọn ngày nghỉ"
          extra={`Tổng số công nghỉ: ${
            totalVacations && totalVacations
          } ${totalText}`}
        >
          <Form.Item
            name="date"
            style={{ width: "100%", border: "none" }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày nghỉ!",
              },
            ]}
          >
            <RangePicker
              // allowClear={false}
              onCalendarChange={CountTotal}
              showToday
              disabledDate={disabledDate}
              format="DD/MM/YYYY H:m"
              placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              style={{ width: "100%", border: "none" }}
              locale={locale}
              showTime
            />
          </Form.Item>
        </Card>

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
            accept="image/png, image/jpeg, image/jpg, .doc, .docx, .pdf , .xlx, .csv"
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

export default Order1;
