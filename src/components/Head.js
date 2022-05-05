import { Link } from "react-router-dom";
import logo from "../commons/images/logo.png";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MaterialAvatar  from '@mui/material/Avatar';
import { Menu, Dropdown } from 'antd';
import { Row, Col, Typography } from 'antd';
import { LogoutOutlined, QuestionCircleOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from 'react';
import { List, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import InputSearch from './Utils/Search';

const { Paragraph } = Typography;
const navAccount = (
    <Menu
        className="dropdown-account"
        items={[
            {
                label: (
                    <>
                        <UserOutlined className="icon-dropdown"/>
                        <Link to={"/profile"}>
                            Profile
                        </Link>
                    </>
                ),
            },
            {
                label: (
                    <>
                        <SettingOutlined className="icon-dropdown"/>
                        <Link target="_blank" rel="noopener noreferrer" to={"/"}>
                            Setting
                        </Link>
                    </>
                ),
            },
            {
                label: (
                    <>
                        <QuestionCircleOutlined className="icon-dropdown"/>
                        <Link target="_blank" rel="noopener noreferrer" to={"/"}>
                            Trợ giúp
                        </Link>
                    </>
                ),
            },
            {
                label: (
                    <>
                        <LogoutOutlined className="icon-dropdown"/>
                        <Link target="_blank" rel="noopener noreferrer" to={"/"}>
                            Logout
                        </Link>
                    </>
                ),
            }
        ]}
    />
);

const Head = () => {
    const [data, setData] = useState([]);
    const loadMoreData = () => {

        // call api notify
        fetch(`https://618a8f5a34b4f400177c4794.mockapi.io/notify?page=${Math.floor(Math.random() * 9)+1}&limit=5`)
          .then(res => res.json())
          .then(body => {
            setData([...data, ...body]);
          })
          .catch(() => {
          });
    };
    const listNotify = (
        <div id="scrollable-notify">
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={true}
            loader={<Skeleton paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>Không còn thông báo nào</Divider>}
            scrollableTarget="scrollable-notify"
          >
            <List
              dataSource={data}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={<Link to={"/"}>{item.title}</Link>}
                    description={<Paragraph Paragraph ellipsis={{ row: 2, suffix: <Link to={"/"}>Xem thêm</Link> }}>{item.description_sort}</Paragraph>}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
    )
    useEffect(() => {
        loadMoreData();
    }, [])

    return (
        <div className="head wr-container">
            <Row justify="space-between" align="middle">
                <Col xs={12} md={12} lg={7}>
                    <Link to={"/"} className="logo"><img src={logo} /></Link>
                </Col>
                <Col xs={0} md={0} lg={10}>
                    <InputSearch />
                </Col>
                <Col xs={12} md={12} lg={7} className="nav-top-right">
                    <IconButton size="large" aria-label="show 4 new mails" color="warning">
                        <Badge badgeContent={4} color="warning">
                            <MailIcon className="icon-nav-top"/>
                        </Badge>
                    </IconButton>
                    <Dropdown overlay={listNotify} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="warning">
                            <Badge badgeContent={4} color="warning">
                                <NotificationsIcon className="icon-nav-top"/>
                            </Badge>
                        </IconButton>
                    </Dropdown>
                    <Dropdown overlay={navAccount} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                        <IconButton size="large" className="account-dropdown">
                            <MaterialAvatar sx={{ width: 32, height: 32 }} src="https://lh3.googleusercontent.com/a-/AOh14GiJHaBSsAqGvMR7dcgJicEvaGNyAcqjR-mcrNO9wQ=s96-c"></MaterialAvatar>
                        </IconButton>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    )
}

export default Head;
