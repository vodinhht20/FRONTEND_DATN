import { Avatar, Button, Card, Col, Form, List, message, Row, DatePicker, Spin, Alert, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { initLoad } from "~/recoil/load";
import { initOrder } from "~/recoil/order";
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
const { RangePicker } = DatePicker;

const OrderPage = () => {
  const loading = useRecoilValue(initLoad);
  const setLoading = useSetRecoilState(initLoad);
  const [totalVacations, setTotalVacations] = useState(0);

  const order = useRecoilValue(initOrder);

  useEffect(() => {
    document.title = order && order;
    // call API data
  }, []);

  const data = [
    {
      name: "Trần Tiến",
      position: "Hành chính nhân sự - CTO",
    },
    {
      name: "Võ Văn Định",
      position: "Hành chính nhân sự - CTO",
    },
    {
      name: "Nguyễn Văn Đạt",
      position: "Hành chính nhân sự",
    },
    {
      name: "Vũ Lê Huy Hoàng",
      position: "Hành chính nhân sự",
    },
  ];

  const onFinish = (values) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (order) {
        message.success('gửi đơn thành công');
        console.log("Success:", [values, {"loaidon": order}]);
      }
      message.warning('gửi đơn lỗi vui lòng chọn loại đơn');
    },2000)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.warning("Gửi đơn lỗi " + errorInfo.errorFields[0].errors);
  };

  function disabledDate(current) {
    let customDate = moment().format("YYYY-MM-DD");
    return current && current < moment(customDate, "YYYY-MM-DD");
  }

  const CountTotal = (value) => {
    if (value[0] != null && value[1] != null) {
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      let tong = Math.round((value[1]._d.getTime() - value[0]._d.getTime()) / day);
      setTotalVacations(tong);
    }
  }


  return (
    <Row className="OrderPage-container" gutter={[12, 12]}>
      <Col xs={24} md={24} lg={24}>
        <Card bordered={false} loading={loading}>
          <p className="text-info">Mẫu đơn {order && order}</p>
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
            extra={`Tổng số công nghỉ: ${totalVacations && totalVacations}`}
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
              allowClear={false}
              onCalendarChange={CountTotal}
              showToday
              disabledDate={disabledDate}
              format="DD/MM/YYYY"
              placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              style={{ width: "100%", border: "none" }}
              locale={locale}
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

          <Card title={"Cấp duyệt"} bordered={false} loading={loading}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="/">{item.name}</a>}
                    description={item.position}
                  />
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
    </Row>
  );
};
export default OrderPage;