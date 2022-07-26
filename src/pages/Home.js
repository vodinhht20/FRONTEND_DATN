import {
  FieldTimeOutlined,
  FundProjectionScreenOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  ReconciliationOutlined,
  RiseOutlined,
  SnippetsOutlined
} from "@ant-design/icons";
import Skeleton from '@mui/material/Skeleton';
import { Row, Col, Card, Typography, Progress, Carousel, Avatar } from "antd";
import { banner01, banner02, banner03, banner04 } from "~/components/images";
import { SliderEvent, SkeletonLine, RankList } from "~/components/Home";
import { initCheckin, initProfile, initLoad, initRankCheckin, initHomeStatistic, initBanner, initCheckKyc, initOT, initBLog, initBirthDay } from "~/recoil/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { message } from '~/firebase';
import { getData2 } from "~/api/BaseAPI";
const { Title } = Typography;

const Home = () => {
  const checkinData = useRecoilValue(initCheckin);
  const loading = useRecoilValue(initLoad);
  const profileData = useRecoilValue(initProfile);
  const otPersonal = useRecoilValue(initOT);
  const dataHome = useRecoilValue(initHomeStatistic);
  const checkKyc = useRecoilValue(initCheckKyc);
  const rankData = useRecoilValue(initRankCheckin);
  const banner = useRecoilValue(initBanner);
  const blog = useRecoilValue(initBLog);
  const listBirthDay = useRecoilValue(initBirthDay);
  const [ordersperMonth, setOrdersperMonth] = useState(0);

  const [proDocument, setProDocument] = useState({text: '', numbers: 0});
  useEffect(() => {
    document.title = "Trang chủ";
    if (checkKyc == 1) {
      setProDocument({text: 'Hồ sơ đã được xác minh', numbers: 100});
    } else if(checkKyc == 0) {
      setProDocument({text: 'Hồ sơ đang chờ duyệt', numbers: 50});
    } else {
      setProDocument({text: 'Cần bổ sung hồ sơ nhân sự', numbers: 0});
    }
  }, [checkKyc])

  useEffect(() => {
    getData2("count-of-orders-per-month")
    .then(({ data }) => setOrdersperMonth(data.orders_perMonth))
  },[]);

  const personnelRecord = (
    <Title level={4} className="title-worktime-current">Hồ sơ nhân sự</Title>
  );
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
                      <SkeletonLine length={5}/>
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
                              <SkeletonLine length={6}/>
                            :
                            <>
                              <Title level={4} className="title-checkin-current">Tháng này</Title>
                              {/* <div className="ant-row ant-row-space-between statistic-home-item">
                                <span className="lable-item"><FundProjectionScreenOutlined className="section-icon"/> Hạng</span>
                                <span className="content-item"><RiseOutlined className="rank-up"/> { dataHome && dataHome.current_rank }</span>
                              </div> */}
                              <div className="ant-row ant-row-space-between statistic-home-item">
                                <span className="lable-item"><ReconciliationOutlined className="section-icon" /> Số công</span>
                                <span className="content-item"> {checkinData.worktime &&  `${checkinData.worktime}/${checkinData.totalDayMonth && checkinData.totalDayMonth}` }</span>
                              </div>
                              <div className="ant-row ant-row-space-between statistic-home-item">
                                <span className="lable-item"><FieldTimeOutlined className="section-icon" /> Số giờ OT</span>
                                <span className="content-item">{ otPersonal && otPersonal }h</span>
                              </div>
                              <Link to="more/don-tu-cua-ban" className="ant-row ant-row-space-between statistic-home-item">
                                <span className="lable-item"><SnippetsOutlined className="section-icon" /> Đơn từ</span>
                                <span className="content-item">{ ordersperMonth && ordersperMonth  }</span>
                              </Link>
                            </>
                          }
                    </Card>
                </Col>
              </Row>
            </Col>
            <Col span={12}  className="box-content-middle">
              <Card className="section-content" title={personnelRecord}>
                  {
                    loading ?
                    <>
                      <Skeleton variant="circular" className="skeleton-personnel-record"></Skeleton>
                      <SkeletonLine length={1}/>
                    </>
                    :
                    <>
                      <Progress type="circle" className="progress-home" percent={proDocument.numbers} format={ percent => `${percent}%`} />
                      <p className="note-pr">{proDocument.text}</p>
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
                {
                  banner.data.length > 0 ?
                    banner.data.map((item, index) =>
                      <Link to={item.links ? item.links : ''} key={index} className="slider-item">
                          <img src={item.image}/>
                      </Link>
                    )
                  :
                    <div className="slider-item">
                      <img src={banner02}/>
                    </div>
                }
              </Carousel>
            }
        </Col>
      </Row>
      <Row gutter={[12,12]} className="box-rank-list mt-3">
        <Col span={24} >
          <Title level={3} className="title-home-top">Nổi bật</Title>
          <Card className="section-content">
            <Row gutter={[12,12]}>
              <Col xs={24} md={12} lg={12} className="col-list-rank">
                <div className="box-title-tab">
                  {
                    loading ?
                    <Skeleton className="load-line-title"/>
                    :
                    <Title level={4} className="title-home-top title-rank-tab bg-danger">Chào đón nhân sự mới</Title>
                  }
                </div>
                <RankList data={rankData.member_onboard} type="onboard" loading={loading} />
              </Col>
              <Col xs={24} md={12} lg={12} className="col-list-rank">
                <div className="box-title-tab">
                  {
                    loading ?
                    <Skeleton className="load-line-title"/>
                    :
                    <Title level={4} className="title-home-top title-rank-tab bg-success">Top chuyên cần tháng</Title>
                  }
                </div>
                <RankList data={rankData.rank_diligence} type="rank" loading={loading} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[12,12]} className="mt-3">
        <Col span={24} >
          <Title level={3} className="title-home-top">Workshop</Title>
          <SliderEvent blog={blog} loading={loading} birthDay={listBirthDay}/>
        </Col>
      </Row>
    </div>
  );
};
export default Home;