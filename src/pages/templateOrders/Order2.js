import { FileImageFilled } from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Col, DatePicker, Form, List, message, Row, Spin, TimePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { getTimeKeep } from "~/api/BaseAPI";
import { initLoad } from "~/recoil/load";

const Order2 = ({ fileImage, loadingSingle, inputImage, onchangleUpload, loading, order, onFinish, onFinishFailed, totalVacations, totalText, RangePicker, CountTotal, disabledDate, locale, TextArea, Upload, props, loadingApprover, approver }) => {
  const setLoading = useSetRecoilState(initLoad);
  const [timeServer, setTimeServer] = useState(null);
  const onChange = (value) => {
    if (value) {
      const date = {
        currentDate: moment(value).format("YYYY-MM-DD")
      };
      getTimeKeep(date).then(({ data }) => {
        if (!data.data.checkin) {
          setTimeServer([null, null]);
          return message.warning(`Ngày ${date.currentDate} chưa có dữ liệu trên hệ thống`);
        }
        setTimeServer([data.data?.checkin, data.data?.checkout]);
      })
        .catch((error) => {
          console.log(error);
          message.warning('Lấy dữ liệu thất bại');
        });
    }
  }
  return (
    <Col xs={24} md={24} lg={24}>
      <Spin spinning={loadingSingle}>
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
            extra={
              <Form.Item
                name="date"
                style={{ width: "100%", border: "none" }}
                rules={[
                  {
                    required: true,
                    message: "Chọn ngày khôi phục!",
                  },
                ]}
              >
                <DatePicker onChange={onChange} format="DD/MM/YYYY" locale={locale} />
              </Form.Item>
            }
          >
          </Card>
          <Row style={{ maxWidth: "100%", margin: 0 }} gutter={[12, 12]}>
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
                <Form.Item
                  name="times"
                  style={{ width: "100%", border: "none", margin: "0" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn giờ chấm công thực tế cần sửa!",
                    },
                  ]}
                >
                  <TimePicker.RangePicker
                    style={{ width: "100%" }}
                    placeholder={["Giờ checkin", "Giờ checkout"]}
                    format="HH:mm:ss"
                    locale={locale}
                  />
                </Form.Item>
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
            <input type="file" accept="image/png, image/gif, image/jpeg" id='input-file-avatar' ref={input => { inputImage = input }} onChange={onchangleUpload} style={{ display: "none" }} />
            <Button
              onClick={() => inputImage.click()}
              style={{ width: "100%", border: "none" }}
              icon={<FileImageFilled style={{ color: "orange" }} />}
            >
              { fileImage || 'Thêm ảnh đính kèm (nếu có)' }
            </Button>
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
      </Spin>
    </Col>
  );
};

export default Order2;
