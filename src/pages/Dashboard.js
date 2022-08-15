import { MoreOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Dropdown, message, PageHeader, Row } from "antd";
import { useEffect, useState } from "react";
import { getData, getData2, timesheet } from "~/api/BaseAPI";
import DashboardRadar from "~/components/Chart/DashboardRadar";
import DashboardPie from "~/components/Chart/DashboardPie";
import { useRecoilState, useRecoilValue } from "recoil";
import { initDataChart } from "~/recoil/dataChart";
import { initLoad } from "~/recoil/load";
import { formatDate } from "~/commons/formatDate";
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useRecoilState(initLoad);
  const [monthYear, setMonthYear] = useState();
  // const [dataTimeSheet, setDataTimeSheet] = useState({});
  const [sumTime, setSumTime] = useState({});
  // const [loading, setLoading] = useState(true);

  // const [dataPie, setDataPie] = useRecoilState(initDataChart);
  // const [dataRadar, setDataRadar] = useRecoilState(initDataChart);

  const [dataChart, setDataChart] = useRecoilState(initDataChart);

  useEffect(() => {
    setLoading(true);
    document.title = "Thống kê";
    let currentMonth = formatDate(null, "MM/Y");
    setMonthYear(currentMonth);

      getData2('dashboard?date='+formatDate(null, 'MM/YYYY'))
      .then(({ data }) => {
        setSumTime(data.sumTime);
        setLoading(false);
      })
  }, []);

  const onChange = (values) => {
    setLoading(true);
    getData2('dashboard?date='+formatDate(values, 'MM/YYYY'))
    .then(({ data }) => {
      setMonthYear(formatDate(values, 'MM/YYYY'));

      if (!data.data.length) {
        message.warning('Không có dữ liệu');
      }
      setDataChart(data.data);
      setSumTime(data.sumTime);
      setLoading(false);
    })
  }

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
    <div className="wr-container dashboard">
      <PageHeader
        ghost={false}
        title="Thống kê"
        subTitle={`Tháng ${monthYear}`}
        extra={[<DropdownMore key="move" />]}
      />

      <Row className="dashboard-container" gutter={[12, 12]}>
        <Col xs={24} md={24} lg={24}>
          <Card bordered={false} loading={loading}>
            <p className="text-info"> Tổng số phút đi muộn: <span className="info-count">{ sumTime && sumTime?.minute_late || 0 } phút</span> </p>
            <p className="text-info"> Tổng số phút về sớm: <span className="info-count">{ sumTime && sumTime?.minute_early || 0 } phút</span> </p>
            <p className="text-info"> Tổng số Phút OT: <span className="info-count">{ sumTime && sumTime?.ot || 0 } ({ sumTime && (sumTime?.ot) / 60 } giờ)</span> </p>
          </Card>
        </Col>
        <Col xs={24} md={24} lg={24}>
          <Card 
            title="Biểu đồ" 
            bordered={false} 
            loading={loading}
            extra={
              <>
              <DatePicker 
                allowClear 
                locale={locale} 
                onChange={onChange} 
                picker="month"
                placeholder="Chọn tháng"
              />
              </>
            }
          >
            <span className="text-info">
              <DashboardPie data={dataChart} />
            </span>
          </Card>
        </Col>
        {/* <Col xs={24} md={12} lg={12}>
          <Card title="Biểu đồ Xu hướng làm việc của bạn" bordered={false} loading={loading}>
            <span className="text-info">
              <DashboardRadar data={dataChart} />
            </span>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};
export default Dashboard;
