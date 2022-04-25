import moment from "moment";
import { MoreOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { formatDate } from "../../commons/services/Library";
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
} from "antd";
const Timesheet = (value) => {
  const [dataTimeSheet, setDataTimeSheet] = useState({});
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    // call api set data
    setDataTimeSheet({
      date: formatDate(value, "MM/Y"),
      workDay: 20,
      holiday: 3,
      leave: 5,
      unpaidLeave: 3,
      OT: 3,
      late: 45,
      countLate: 3,
      early: 23,
      countEarly: 3,
      workingUnit: 0,
      WFH: 3
    });

    // after call api
    setTimeout(()=>{
      setLoading(false);
    }, 1000)
  }, []);

  function getListData(value) {
    let listData;
    switch (formatDate(value, 'DD-MM')) {
      case '30-04':
        listData = [
          { type: 'success', content: 'Nghĩ lễ 30/4' },
        ];
        break;
      case '01-05':
        listData = [
          { type: 'success', content: 'Nghỉ lễ 1/5' },
        ];
        break;
      default:
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
    // call API get data by monthYear
    setLoading(true);
    setDataTimeSheet({
      date: monthYear,
      workDay: 20,
      holiday: 3,
      leave: 5,
      unpaidLeave: 3,
      OT: 3,
      late: 45,
      countLate: 3,
      early: 23,
      countEarly: 3,
      workingUnit: 0,
      WFH: 3
    });

    // after call api
    setTimeout(()=>{
      setLoading(false);
    }, 1000)
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
    // call api report
    console.log(values);
    setVisible(false);
  }

  return (
    <>
      <div className="site-page-header-ghost-wrapper timesheet wr-container">
        <PageHeader
          ghost={false}
          title="Thống kê bảng công"
          subTitle={`Tháng ${dataTimeSheet.date}`}
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
              <span className="text-info">23/27</span>
            </Descriptions.Item>
          </Descriptions>
          <div className="site-card-wrapper statistical-work-month">
            <Row gutter={[12,12]}>
              <Col xs={12} md={8} lg={6}>
                <Card title="Đi muộn" bordered={false} loading={loading} active>
                  <span className="text-info">{dataTimeSheet.late} phút / {dataTimeSheet.countLate} lần</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Về sớm" bordered={false} loading={loading} active>
                  <span className="text-info">{dataTimeSheet.early} phút / {dataTimeSheet.countEarly} lần</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công nghỉ phép" bordered={false} loading={loading} active>
                  <span className="text-info">{dataTimeSheet.leave} ngày</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công giờ OT" bordered={false} loading={loading} active>
                  <span className="text-info">{dataTimeSheet.OT} giờ</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công nghỉ lễ" bordered={false} loading={loading} active>
                  <span className="text-info">{dataTimeSheet.holiday} ngày</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công công tác" bordered={false} loading={loading} active>
                  <span className="text-info">{dataTimeSheet.workingUnit} ngày</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công nghỉ không lương" bordered={false} loading={loading} active>
                  <span className="text-info">{dataTimeSheet.unpaidLeave} ngày</span>
                </Card>
              </Col>
              <Col xs={12} md={8} lg={6}>
                <Card title="Công work from home" bordered={false} loading={loading} active>
                  <span className="text-info">{dataTimeSheet.WFH} ngày</span>
                </Card>
              </Col>
            </Row>
          </div>
          <Calendar
            onChange={e => getDate(e)}
            dateCellRender={dateCellRender}
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
          ;
        </PageHeader>
      </div>
    </>
  );
};
export default Timesheet;
