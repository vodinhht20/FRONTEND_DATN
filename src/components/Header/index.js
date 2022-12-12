import { Link } from "react-router-dom";
import logo from "~/assets/images/logo.png";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MaterialAvatar from "@mui/material/Avatar";
import { Menu, Dropdown, PageHeader, message } from "antd";
import { Row, Col, Typography } from "antd";
import {
  LogoutOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { List, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import InputSearch from "~/components/Search";
import { initProfile } from "~/recoil/profile";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { Tabs } from "antd";
import { Logout, watchedNoti, watchedNotiAll } from "~/api/BaseAPI";
import { reactLocalStorage } from "reactjs-localstorage";
import { initAccessToken } from "~/recoil/accessToken";
import { initLoad } from "~/recoil/load";
import { initCheckin } from "~/recoil/checkin";
import { initDataChart } from "~/recoil/dataChart";
import { initListOrder } from "~/recoil/listOrder";
import { initRankCheckin } from "~/recoil/rankCheckin";
import { initHomeStatistic } from "~/recoil/homeStatistic";
import { initNotification } from "~/recoil/notification";
const { TabPane } = Tabs;

const { Paragraph } = Typography;

const Head = () => {
  const [data, setData] = useState([]);
  const profile = useRecoilValue(initProfile);
  const resetAccessToken = useResetRecoilState(initAccessToken);

  //reset Recoil logout
  const resetProfile = useResetRecoilState(initProfile);
  const resetLoading = useResetRecoilState(initLoad);
  const resetCheckin = useResetRecoilState(initCheckin);
  const resetDataChart = useResetRecoilState(initDataChart);
  const resetlistOrder = useResetRecoilState(initListOrder);
  const resetRankCheckin = useResetRecoilState(initRankCheckin);
  const resetHomeStatistic = useResetRecoilState(initHomeStatistic);

  const [notifications, setNotifications] = useRecoilState(initNotification);
  const notiPersonal = notifications && notifications.filter(noti => noti.type == 2);
  const notiGlobal = notifications && notifications.filter(noti => noti.type == 1);

  const [notiNotWached, setNotiNotWached] = useState(null);

  useEffect(() => {
    let notiNot = notifications && notifications.filter(noti => noti.watched == 0);
    setNotiNotWached(notiNot);
  }, [notifications]);

  //reset Recoil logout

  const LogoutFunc = () => {
    Logout()
    .then(( ) => {
      reactLocalStorage.clear();
      resetAccessToken('');
      resetProfile();
      resetLoading();
      resetCheckin();
      resetDataChart();
      resetlistOrder();
      resetRankCheckin();
      resetHomeStatistic();
    })
    .then(() => {
      message.success('Đã đăng xuất');
    })
    .catch((error) => {
      reactLocalStorage.clear();
      resetAccessToken('');
      message.success('Đã đăng xuất');
    })
  }

  const viewNoti = (id) => {
    let notis = notifications.map(noti => {
      if (noti.id == id && noti.watched == 0) {
        watchedNoti({'id': id})
        .then(({ data }) => {
          console.log('Thành công '+data)
        })
        return {...noti, 'watched': 1}
      }
      return noti;
    });
    setNotifications(notis);
  }

  const viewNotiAll = () => {
    let notis = notifications.map(noti => {
      if (noti.watched == 0) {
          watchedNotiAll();
      }
      return {...noti, 'watched': 1}
    });
    setNotifications(notis);
  }

  const listNotify = (
    <div id="scrollable-notify">
      <PageHeader className="header-notification" title="Thông báo" onClick={() => viewNoti} />
      <InfiniteScroll
        dataLength={notifications.length}
        // next={loadMoreData}
        // hasMore={true}
        // loader={<Skeleton paragraph={{ rows: 1 }} active />}
        // endMessage={<Divider plain>Không còn thông báo nào</Divider>}
        scrollableTarget="scrollable-notify"
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span>Thông báo cho bạn</span>} key="1">
            <List
              dataSource={notiPersonal}
              renderItem={(item) => (
                <List.Item key={item.id} className={`noti ${item.watched == 0 ? 'active' : ''}`}>
                  <List.Item.Meta
                    title={<Link onClick={() => viewNoti(item.id)} to={item.link ? item.link : null}>{item.title}</Link>}
                    description={
                      <Link onClick={() => viewNoti(item.id)} to={item.link ? item.link : null}>
                        <Paragraph
                          Paragraph
                          // ellipsis={{
                          //   row: 2,
                          //   suffix: <Link to={"/"}>Xem thêm</Link>,
                          // }}
                        >
                          {item.content}
                        </Paragraph>
                      </Link>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab={<span>Thông báo tổng</span>} key="2">
            <List
                dataSource={notiGlobal}
                renderItem={(item) => (
                  <List.Item key={item.id} className={`noti ${item.watched == 0 ? 'active' : ''}`}>
                    <List.Item.Meta
                      title={<Link onClick={() => viewNoti(item.id)} to={item.link ? item.link : null}>{item.title}</Link>}
                      description={
                        <Link onClick={() => viewNoti(item.id)} to={item.link ? item.link : null}>
                          <Paragraph
                            Paragraph
                            // ellipsis={{
                            //   row: 2,
                            //   suffix: <Link to={"/"}>Xem thêm</Link>,
                            // }}
                          >
                            {item.content}
                          </Paragraph>
                        </Link>
                      }
                    />
                  </List.Item>
                )}
              />
          </TabPane>
        </Tabs>
      </InfiniteScroll>

      <div className="scrollable-notify-footer">
        <span onClick={() => viewNotiAll()}className="mark-all">Đánh dấu tất cả là đã đọc</span>
        <span className="see-all">Xem tất cả thông báo</span>
      </div>
    </div>
  );
  // useEffect(() => {
  //   loadMoreData();
  // }, []);

  const navAccount = (
    <Menu
      className="dropdown-account"
      items={[
        {
          label: (
            <>
              <UserOutlined className="icon-dropdown" />
              <Link to={"/profile"}>Profile</Link>
            </>
          ),
        },
        {
          label: (
            <div className="logout" onClick={LogoutFunc}>
              <LogoutOutlined className="icon-dropdown" />
                Logout
            </div>
          ),
        }
      ]}
    />
  );

  console.log(notiNotWached);

  return (
    <div className="head wr-container">
      <Row justify="space-between" align="middle">
        <Col xs={12} md={12} lg={7}>
          <Link to={"/"} className="logo">
            <img src={logo} />
          </Link>
        </Col>
        <Col xs={0} md={0} lg={10}>
          <InputSearch placeholder="Tìm kiếm" style={{width: "100%"}} />
        </Col>
        <Col xs={12} md={12} lg={7} style={{ alignItems: "center" }} className="nav-top-right">
          {/* <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="warning"
          >
            <Badge badgeContent={47} color="warning">
              <MailIcon className="icon-nav-top" />
            </Badge>
          </IconButton> */}
          <Dropdown
            overlay={listNotify}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="warning"
            >
              <Badge badgeContent={notiNotWached?.length || 0} color="warning">
                <NotificationsIcon className="icon-nav-top" />
              </Badge>
            </IconButton>
          </Dropdown>
          <Dropdown
            overlay={navAccount}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <IconButton size="large" className="account-dropdown">
              <MaterialAvatar
                sx={{ width: 32, height: 32 }}
                src={profile.avatar}
              ></MaterialAvatar>
            </IconButton>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default Head;
