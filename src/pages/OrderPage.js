import { Avatar, Button, Card, Col, Form, List, message, Row, DatePicker, Spin, Alert, Input, Badge } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { initLoad } from "~/recoil/load";
import { initOrder } from "~/recoil/order";
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import Loading from "~/components/Global/Loading";
import { getData2, requests } from "~/api/BaseAPI";
import { useNavigate, useParams } from "react-router-dom";
const { RangePicker } = DatePicker;

const OrderPage = () => {
  const loading = useRecoilValue(initLoad);
  const setLoading = useSetRecoilState(initLoad);
  const [totalVacations, setTotalVacations] = useState(0);
  const [totalText, setTotalText] = useState('Ngày');
  const [active, setActive] = useState('');
  const [approver, setApprover] = useState([]);
  const [loadingApprover, setLoadingApprover] = useState(true);
  
  const [order, setOrder] = useRecoilState(initOrder);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!order) {
      getData2("list-single-type/"+id)
      .then(({ data }) => {
        setOrder(data.payload);
      });
    };
    document.title = order && order.name;
    // call API data
    getData2('list-approver/'+id)
    .then(({ data }) => {
      setApprover(data.payload)
      setLoadingApprover(false)
    })
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    setActive('active');
    const date = [
      moment(values.date[0]).format("YYYY-MM-DD H:m:s"),
      moment(values.date[1]).format("YYYY-MM-DD H:m:s")
    ];
    requests({...values, date, id})
    .then(({ data }) => {
      setLoading(false);
      setActive('');
      message.success(data.message);
    })
    .then(() => {
      navigate('/more/create-order');
    })
    .catch((error) => {
      setLoading(false);
      setActive('');
      message.warning(error.response.data.message);
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.warning(errorInfo.errorFields[0].errors);
  };

  function disabledDate(current) {
    let customDate = moment().format("YYYY-MM-DD");
    return current && current < moment(customDate, "YYYY-MM-DD");
  }

  const CountTotal = (value) => {
    setTotalVacations(0);
    if (value) {
      if (value[0] != null && value[1] != null) {
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        let tong = Math.round((value[1]._d.getTime() - value[0]._d.getTime()) / day);
        if (tong <= 0) {
          tong = ((value[1]._d.getTime() - value[0]._d.getTime()) / hour).toFixed(1);
          setTotalText('Giờ');
        }else{
          setTotalText('Ngày');
        }
        setTotalVacations(tong);
      }
    }
  }


  return (
    <Row className="OrderPage-container" gutter={[12, 12]}>
      <Loading loading={active} />
      <Col xs={24} md={24} lg={24}>
        <Card bordered={false} loading={loading}>
          <h3 className="text-info">Mẫu đơn: {order && order.name}</h3>
          <p className="text-info" style={{textAlign: 'justify'}}>Mô tả:  {order && order.description}</p>
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
            extra={`Tổng số công nghỉ: ${totalVacations && totalVacations} ${totalText}`}
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

          <Card title={"Cấp duyệt"} bordered={false} loading={loadingApprover}>
            <List
              itemLayout="horizontal"
              dataSource={approver}
              renderItem={(item) => (
                <List.Item>
                  
                    <List.Item.Meta
                      avatar={ item.avatar ? <Avatar src={item.avatar} /> : <Avatar style={{ backgroundColor: '#f56a00' }}>{item.fullname[0]}</Avatar>}
                      title={<a href="/">{item.fullname}</a>}
                      description={item.position}
                    />
                    
                  <div>{item.required_leader === 1 ? <Badge.Ribbon className="first-reviewer" text="Người duyệt đầu"></Badge.Ribbon> : null}</div>
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
