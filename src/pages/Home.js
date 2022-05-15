import {
  FundProjectionScreenOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  ReconciliationOutlined,
  RiseOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Row, Col, Card, Typography, Progress, Carousel } from "antd";

import banner01 from "~/assets/images/banner/banner_01.png";
import banner02 from "~/assets/images/banner/banner_02.png";
import banner03 from "~/assets/images/banner/banner_03.png";
import banner04 from "~/assets/images/banner/banner_04.png";
import SliderEvent from "~/components/Home/SliderEvent";
const { Title } = Typography;

const Home = () => {
  const loading = false;
  const workDay = 5;
  const totalWorkDay = 26;
  const percentPR = 75;
  const currentRank = 10;
  const checkin = "07:30";
  const checkout = null;

  const boxWorktime = (
    <Title level={4} className="title-worktime-current">Hồ sơ nhân sự</Title>
  );
  return (
    <div className="wr-container home-page">
      <div className="bg-home"></div>
      <Row gutter={[12,12]}>
        <Col xs={24} md={24} lg={10}>
          <Title level={3} className="title-home-top">Xin chào <b>Võ Định</b></Title>
          <Row gutter={[0,12]}>
            <Col span={12}  className="box-content-left">
              <Row className="row-content-left" gutter={[0, 8]}>
                <Col span={24}>
                  <Card className="section-content" loading={loading}>
                    <>
                      <Title level={4} className="title-checkin-current">Hôm nay</Title>
                      <div className="ant-row ant-row-space-between item statistic-home-item">
                        <span className="lable-item"><NodeExpandOutlined className="section-icon"/> Checkin</span>
                        <span className="content-item">
                        {
                          checkin || <span className="data-empty">--:--</span>
                        }
                        </span>
                      </div>
                      <div className="ant-row ant-row-space-between item statistic-home-item">
                        <span className="lable-item"><NodeCollapseOutlined className="section-icon"/> Checkout</span>
                        <span className="content-item">
                          {
                            checkout || <span className="data-empty">--:--</span>
                          }
                        </span>
                      </div>
                    </>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card className="section-content" loading={loading}>
                      <div className="ant-row ant-row-space-between statistic-home-item">
                        <span className="lable-item"><FundProjectionScreenOutlined className="section-icon"/> Hạng</span>
                        <span className="content-item"><RiseOutlined className="rank-up"/> { currentRank }</span>
                      </div>
                      <div className="ant-row ant-row-space-between statistic-home-item">
                        <span className="lable-item"><ReconciliationOutlined className="section-icon" /> Số công</span>
                        <span className="content-item"> { `${workDay}/${totalWorkDay}` }</span>
                      </div>
                      <div className="ant-row ant-row-space-between statistic-home-item">
                        <span className="lable-item"><SnippetsOutlined className="section-icon" /> Đơn từ</span>
                        <span className="content-item"> 10</span>
                      </div>
                    </Card>
                </Col>
              </Row>
            </Col>
            <Col span={12}  className="box-content-middle">
              <Card className="section-content" title={boxWorktime} loading={loading}>
                <Progress type="circle" className="progress-home" percent={percentPR} format={ percent => `${percent}%`} />
                <p className="note-pr">Cần bổ sung hồ sơ nhân sự</p>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={24} lg={14} className="box-content-right">
          <Title level={3} className="title-home-top" >Bảng tin</Title>
          <Carousel autoplay autoplaySpeed={5000} speed={2000} dots={{ className: "dot-slider" }} loading={loading} className="home-slide">
            <div className="slider-item">
              <img src={banner01}/>
            </div>
            <div className="slider-item">
              <img src={banner02}/>
            </div>
            <div className="slider-item">
              <img src={banner03}/>
            </div>
            <div className="slider-item">
            <img src={banner04}/>
            </div>
          </Carousel>
        </Col>
      </Row>
      <Row gutter={[12,12]} className="mt-3">
        <Col span={24} >
          <Title level={3} className="title-home-top">Workshop</Title>
          <SliderEvent loading={loading}/>
        </Col>
      </Row>
    </div>
  );
};
export default Home;