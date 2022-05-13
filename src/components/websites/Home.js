import { FundProjectionScreenOutlined, FundViewOutlined, NodeCollapseOutlined, NodeExpandOutlined, RiseOutlined } from "@ant-design/icons";
import { Row, Col, Card, Typography, Progress, Carousel } from "antd";
import { useEffect, useState } from "react";
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const workingTime = 20;
  const totalDay = 26;

  const boxCheckin = (
    <>
      <Title level={4} className="title-checkin-current">Hôm nay</Title>
      <div className="ant-row ant-row-space-between"><span className="lable-item"><NodeExpandOutlined className="icon-checkin"/> Checkin</span><span className="content-item"> 08:00</span></div>
      <div className="ant-row ant-row-space-between"><span className="lable-item"><NodeCollapseOutlined className="icon-checkin"/> Checkout</span><span className="content-item"> N/A</span></div>
    </>
  )

  const boxWorktime = (
    <Title level={4} className="title-worktime-current">Công tháng này</Title>
  );

  const contentStyle = {
    height: '250px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <div className="home-page">
      <div className="bg-home"></div>
      <Row gutter={[12,12]}>
        <Col xs={24} md={18} lg={8}>
          <Title level={3} className="title-home title-home-left">Xin chào <b>Võ Định</b></Title>
          <Row gutter={[12,12]} className="box-section-left">
            <Col xs={24} md={18} lg={12}>
              <Card title={boxCheckin} className="section-content">
              <div className="ant-row ant-row-space-between"><span className="lable-item"><FundProjectionScreenOutlined className="icon-checkin"/> Rank</span> <span className="content-item"> 20 <RiseOutlined className="rank-up"/></span></div>
              </Card>
            </Col>
            <Col xs={24} md={18} lg={12}>
              <Card className="section-content" title={boxWorktime}>
                <Progress type="circle" percent={workingTime/totalDay*100} format={ percent => `${workingTime}/${totalDay}`} />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={18} lg={16}>
            <Title level={3} className="title-home">Bảng tin</Title>
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
        </Col>
      </Row>
    </div>
  );
};
export default Home;