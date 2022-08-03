import moment from "moment";
import { MoreOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { formatDate } from "~/commons/formatDate";
import { timesheet } from "~/api/BaseAPI";
import {
  PageHeader,
  Button,
  Descriptions,
  Dropdown,
  Calendar,
  Badge,
  Card,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Spin,
} from "antd";
const Timesheet = () => {
  const [dataTimeSheet, setDataTimeSheet] = useState({});
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [monthYear, setMonthYear] = useState();
  const [form] = Form.useForm();
  useEffect(() => {
    document.title = "Bảng công";
    let currentMonth = formatDate(null, "MM/Y");
    setMonthYear(currentMonth);
    timesheet(currentMonth)
      .then(({ data }) => {
        setDataTimeSheet(data.data)
        setLoading(false);
      });
  }, []);

  function getListData(value) {
    let listData;
    let valueCalendar = formatDate(value, 'DD-MM');
    if (dataTimeSheet.timesheet && dataTimeSheet.timesheet[valueCalendar]) {
      let dataItem = dataTimeSheet.timesheet[valueCalendar];
      listData = [
        { type: dataItem.checkin ? 'success' : 'warning', content: `Checkin: ${dataItem.checkin || 0}` },
        { type: dataItem.checkout ? 'success' : 'warning', content: `Checkout: ${dataItem.checkout || 0}` },
        { type: dataItem.worktime ? 'success' : 'warning', content: `Số công: ${dataItem.worktime || 0}` },
        { type: dataItem.minute_early ? 'success' : 'warning', content: `Về sớm: ${dataItem.minute_early || 0} phút`},
        { type: dataItem.minute_late ? 'success' : 'warning', content: `Đi muộn: ${dataItem.minute_late || 0} phút` }
      ];
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  function getDate (date) {
    let monthYear = formatDate(date, "MM/Y");
    setMonthYear(monthYear);
    setLoading(true);
    timesheet(monthYear)
      .then(({ data }) => {
        setDataTimeSheet(data.data)
        console.log("dataTimeSheet", data.data);
        setLoading(false);
      });
  }

  const DropdownMore = () => (
    <Dropdown  key="more" overlay={<a onClick={() => setVisible(true)}>Báo cáo</a>} placement="bottomRight">
        <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
    </Dropdown>
  );

  const validateMessages = {
    required: 'Không được để trống nội dung !',
    string: {
      range: 'Nội dung phải lớn hơn ${min} ký tự và nhỏ hơn ${max} ký tự',
    },
  };

  const handleSubmitReport = (values) => {
    console.log(values);
    setVisible(false);
  }

  return (
    <>
      <div className="site-page-header-ghost-wrapper timesheet wr-container">
        <PageHeader
          ghost={false}
          title="Thống kê bảng công"
          subTitle={`Tháng ${monthYear}`}
          extra={[<DropdownMore key="move" />]}
        >
          <Modal
              title="Báo cáo vấn đề"
              visible={visible}
              onOk={form.submit}
              onCancel={() => setVisible(false)}
            >
              <Form form={form} onFinish={handleSubmitReport} validateMessages={validateMessages} layout="vertical">
                <Form.Item name='report' label="Nhập vấn đề gặp phải" rules={[{ required: true }, { type: 'string', max: 255, min: 10 }]}>
                  <Input.TextArea placeholder="Nhập nội dung ..."/>
                </Form.Item>
              </Form>
          </Modal>
          <Descriptions>
            <Descriptions.Item label="Tổng công ghi nhận ">
              <span className="text-info">{ dataTimeSheet.sum_current_worktime && dataTimeSheet.sum_current_worktime || 0 }/{ dataTimeSheet.totalDayMonth && dataTimeSheet.totalDayMonth || 0 }</span>
            </Descriptions.Item>
          </Descriptions>
          <div className="site-card-wrapper statistical-work-month">
            <Row gutter={[12,12]}>
              <Col xs={12} md={8} lg={6}>
                <Card title="Đi muộn" bordered={false} loading={loading} active>
                  <span className="text-info">{ dataTimeSheet.sum_minute_late_worktime || 0 } phút</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Về sớm" bordered={false} loading={loading}>
                  <span className="text-info">{ dataTimeSheet.sum_minute_early_worktime || 0 } phút</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công nghỉ phép" bordered={false} loading={loading}>
                  <span className="text-info">{ dataTimeSheet.sum_leave_worktime  || 0 } công</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công giờ OT" bordered={false} loading={loading}>
                  <span className="text-info">{ dataTimeSheet.sum_overtime_hour_worktime || 0 } giờ</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công nghỉ lễ" bordered={false} loading={loading}>
                  <span className="text-info">{ dataTimeSheet.sum_holiday_worktime || 0 } ngày</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công công tác" bordered={false} loading={loading}>
                  <span className="text-info">{ 0 } ngày</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công nghỉ không lương" bordered={false} loading={loading}>
                  <span className="text-info">{ dataTimeSheet.sum_no_salary_worktime || 0 } ngày</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công work from home" bordered={false} loading={loading}>
                  <span className="text-info">{ 0 } ngày</span>
                </Card>
              </Col>
            </Row>
          </div>
          <Spin spinning={loading}>
            <Calendar
              onChange={e => getDate(e)}
              dateCellRender={dateCellRender}
              className="timesheet-calendar"
              locale={{
                lang: {
                  locale: "vi_VN",
                  month: "Tháng",
                  year: "Năm",
                  dayFormat: moment.updateLocale("vn", {
                    weekdaysMin: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7" ]
                  }),
                },
                monthFormat: moment.updateLocale("vn", {
                  monthsShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12' ]
                })
              }}
            />
          </Spin>
        </PageHeader>
      </div>
    </>
  );
};
export default Timesheet;
