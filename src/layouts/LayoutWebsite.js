import { LinearProgress } from "@mui/material";
import { Col, Layout, PageHeader, Row } from "antd";
import { Outlet } from "react-router-dom";
import Head from "~/components/Header";
import MenuBottom from "~/components/NavBottom";
import { initLoad } from "~/recoil/load";
import { useRecoilValue } from "recoil";
import PopupLocation from "~/components/Global/PopupLocation";
import { initLoadLocationPopup } from "~/recoil/loadLocationPopup";

const { Header, Footer, Sider, Content } = Layout;

const LayoutWebsite = () => {
  const loading = useRecoilValue(initLoad);
  const locationpopup = useRecoilValue(initLoadLocationPopup);
  return (
    <>
      <Layout>
        <Header>
          <Head />
        </Header>
        <Content className="content-wrapper" style={{ marginBottom: '100px'}}>
          <LinearProgress style={ !loading ? { display:  "none"} : {}} className="loading-bottom-head"/>
          <Row justify="center">
            <Col xs={24} md={22} lg={20}>
              <Outlet />
            </Col>
          </Row>
        </Content>
        <MenuBottom />
      </Layout>
      <PopupLocation locationpopup={locationpopup} />
    </>
  );
};

export default LayoutWebsite;
