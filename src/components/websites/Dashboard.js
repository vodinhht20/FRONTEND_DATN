import { MoreOutlined } from "@ant-design/icons";
import { Button, Card, Col, Dropdown, PageHeader, Row } from "antd";
import { useEffect, useState } from "react";
import { DashboardPie, DashboardRadar } from "../../commons/chart/Dashboard";

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataPie, setDataPie] = useState([]);
  const [dataRadar, setDataRadar] = useState([]);

  useEffect(() => {
    // call API data
    const data = [
      {
        type: "Ngày nghỉ",
        value: 5,
      },
      {
        type: "Ngày làm việc",
        value: 20,
      },
      {
        type: "Nghỉ lễ",
        value: 1,
      },
      {
        type: "Nghỉ T7,CN",
        value: 4,
      },
    ];
    
    setDataPie(data);
    setDataRadar(data);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
    <div className="dashboard">
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
              <DashboardPie data={dataPie} />
            </span>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <Card title="Biểu đồ Xu hướng làm việc của bạn" bordered={false} loading={loading}>
            <span className="text-info">
              <DashboardRadar data={dataRadar} />
            </span>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
