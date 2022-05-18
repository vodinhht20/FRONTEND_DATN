import {
  FundProjectionScreenOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  ReconciliationOutlined,
  RiseOutlined,
  SnippetsOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from "@ant-design/icons";
import Skeleton from '@mui/material/Skeleton';
import { Row, Col, Card, Typography, Progress, Carousel, Avatar } from "antd";

import banner01 from "~/assets/images/banner/banner_01.png";
import banner02 from "~/assets/images/banner/banner_02.png";
import banner03 from "~/assets/images/banner/banner_03.png";
import banner04 from "~/assets/images/banner/banner_04.png";
import { SliderEvent, SkeletonLine, RankList } from "~/components/Home";
import { initCheckin } from "~/recoil/checkinAtom";
import { initLoad } from "~/recoil/loadAtom";
import { initProfile } from "~/recoil/profileAtom";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
const { Title } = Typography;

const Home = () => {
  const checkinData = useRecoilValue(initCheckin);
  const loading = useRecoilValue(initLoad);
  const profileData = useRecoilValue(initProfile);
  const [dataHome, setDataHome] = useState({});
  useEffect(() => {
    setDataHome({
      work_day: 5,
      total_work_day: 26,
      percent_pr: 75,
      current_rank: 10,
      requests: 3
    })
  })
  const boxWorktime = (
    <Title level={4} className="title-worktime-current">Hồ sơ nhân sự</Title>
  );
  console.log("SkeletonLine", <SkeletonLine line={3} />);
  return (
    <div className="wr-container home-page">
      <div className="bg-home"></div>
      <Row gutter={[12,12]}>
        <Col xs={24} md={24} lg={10}>
          <Title level={3} className="title-home-top">Xin chào <b>{ profileData && profileData.fullname }</b></Title>
          <Row gutter={[0,12]}>
            <Col span={12}  className="box-content-left">
              <Row className="row-content-left" gutter={[0, 8]}>
                <Col span={24}>
                  <Card className="section-content">
                    {
                      loading ?
                      <SkeletonLine/>
                      :
                      <>
                        <Title level={4} className="title-checkin-current">Hôm nay</Title>
                        <div className="ant-row ant-row-space-between item statistic-home-item">
                          <span className="lable-item"><NodeExpandOutlined className="section-icon"/> Checkin</span>
                          <span className="content-item">
                          {
                            checkinData.checkin || <span className="data-empty">--:--</span>
                          }
                          </span>
                        </div>
                        <div className="ant-row ant-row-space-between item statistic-home-item">
                          <span className="lable-item"><NodeCollapseOutlined className="section-icon"/> Checkout</span>
                          <span className="content-item">
                            {
                              checkinData.checkout || <span className="data-empty">--:--</span>
                            }
                          </span>
                        </div>
                      </>
                    }
                  </Card>
                </Col>
                <Col span={24}>
                  <Card className="section-content">
                          {
                            loading ?
                              <SkeletonLine/>
                            :
                            <>
                              <div className="ant-row ant-row-space-between statistic-home-item">
                                <span className="lable-item"><FundProjectionScreenOutlined className="section-icon"/> Hạng</span>
                                <span className="content-item"><RiseOutlined className="rank-up"/> { dataHome && dataHome.current_rank }</span>
                              </div>
                              <div className="ant-row ant-row-space-between statistic-home-item">
                                <span className="lable-item"><ReconciliationOutlined className="section-icon" /> Số công</span>
                                <span className="content-item"> {dataHome &&  `${dataHome.work_day}/${dataHome.total_work_day}` }</span>
                              </div>
                              <div className="ant-row ant-row-space-between statistic-home-item">
                                <span className="lable-item"><SnippetsOutlined className="section-icon" /> Đơn từ</span>
                                <span className="content-item">{ dataHome && dataHome.requests  }</span>
                              </div>
                            </>
                          }
                    </Card>
                </Col>
              </Row>
            </Col>
            <Col span={12}  className="box-content-middle">
              <Card className="section-content" title={boxWorktime}>
                  {
                    loading ?
                    <>
                      <Skeleton variant="circular">
                        <Progress type="circle" className="progress-home" percent={dataHome ? dataHome.percent_pr : 0} format={ percent => `${percent}%`} />
                        <p className="note-pr">Cần bổ sung hồ sơ nhân sự</p>
                      </Skeleton>
                    </>
                    :
                    <>
                      <Progress type="circle" className="progress-home" percent={dataHome ? dataHome.percent_pr : 0} format={ percent => `${percent}%`} />
                      <p className="note-pr">Cần bổ sung hồ sơ nhân sự</p>
                    </>
                  }
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={24} lg={14} className="box-content-right">
            <Title level={3} className="title-home-top" >Bảng tin</Title>
            {
              loading ?
              <>
                <Skeleton className="skeleton-banner"/>
              </>
              :
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
            }
        </Col>
      </Row>
      <Row gutter={[12,12]} className="box-rank-list mt-3">
        <Col span={24} >
          <Title level={3} className="title-home-top">Xếp hạng hôm nay</Title>
          <Card>
            <Row>
              <Col xs={24} md={12} lg={12}>
                <Title level={4} className="title-home-top">Top 5 đi sớm</Title>
                <RankList />
              </Col>
              <Col xs={24} md={12} lg={12}>
                <Title level={4} className="title-home-top">Top 5 đi muộn</Title>
                <RankList />
              </Col>
            </Row>
          </Card>
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