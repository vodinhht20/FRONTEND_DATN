import { FundProjectionScreenOutlined, FundViewOutlined, NodeCollapseOutlined, NodeExpandOutlined, RiseOutlined } from "@ant-design/icons";
import { Row, Col, Card, Typography, Progress, Carousel } from "antd";
import { useEffect, useState } from "react";
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const workingTime = 20;
  const totalDay = 26;

  const boxCheckin = (
    <>
      <Title level={4}>Hôm nay</Title>
      <div><span><NodeExpandOutlined className="icon-checkin"/>Checkin</span> 08:00</div>
      <div><span><NodeCollapseOutlined className="icon-checkin"/>Checkout</span> N/A</div>
    </>
  )

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <div className="home-page">
      <Row gutter={[12,12]}>
        <Col xs={24} md={18} lg={8}>
          <Row gutter={[12,12]}>
            <Col xs={24} md={18} lg={12}>
              <Card title={boxCheckin}>
              <div><span><FundProjectionScreenOutlined className="icon-checkin"/> Xếp hạng</span> 30 <RiseOutlined /></div>
              </Card>
            </Col>
            <Col xs={24} md={18} lg={12}>
              <Card>
                <Title level={4}>Công tháng này</Title>
                <Progress type="circle" percent={workingTime/totalDay*100} format={ percent => `${workingTime}/${totalDay}`} />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={18} lg={16}>
          <Card>
            <Carousel autoplay dots={{ className: "dotSlider" }}>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Home;