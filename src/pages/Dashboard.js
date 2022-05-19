import { MoreOutlined } from "@ant-design/icons";
import { Button, Card, Col, Dropdown, PageHeader, Row } from "antd";
import { useEffect, useState } from "react";
import { getData } from "~/api/BaseAPI";
import DashboardRadar from "~/components/Chart/DashboardRadar";
import DashboardPie from "~/components/Chart/DashboardPie";
import { useRecoilState, useRecoilValue } from "recoil";
import { initDataChart } from "~/recoil/dataChart";
import { initLoad } from "~/recoil/loadAtom";

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const loading = useRecoilValue(initLoad);
  
  // const [dataPie, setDataPie] = useRecoilState(initDataChart);
  // const [dataRadar, setDataRadar] = useRecoilState(initDataChart);

  const dataChart = useRecoilValue(initDataChart);

  useEffect(() => {
    document.title = "Thống kê";
    // call API data
    // getData('dashboard')
    // .then(({data}) => {
    //   setDataPie(data)
    //   setDataRadar(data)
    // })
  }, []);

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
        extra={[<DropdownMore key="move" />]}
      />

      <Row className="dashboard-container" gutter={[12, 12]}>
        <Col xs={24} md={24} lg={24}>
          <Card bordered={false} loading={loading}>
            <p className="text-info"> Tổng số ngày đi làm: <span className="info-count">20</span> </p>
            <p className="text-info"> Tổng số ngày nghỉ: <span className="info-count">5</span> </p>
            <p className="text-info"> Tổng số ngày nghỉ lễ và thứ 7 chủ nhật: <span className="info-count">5</span> </p>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <Card title="Biểu đồ Pie" bordered={false} loading={loading}>
            <span className="text-info">
              <DashboardPie data={dataChart} />
            </span>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <Card title="Biểu đồ Xu hướng làm việc của bạn" bordered={false} loading={loading}>
            <span className="text-info">
              <DashboardRadar data={dataChart} />
            </span>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
