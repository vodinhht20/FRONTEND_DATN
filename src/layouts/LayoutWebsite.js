import { LinearProgress } from "@mui/material";
import { Col, Layout, PageHeader, Row } from "antd";
import { Outlet } from "react-router-dom";
import Head from "~/components/Header";
import MenuBottom from "~/components/NavBottom";
import { initLoad } from "~/recoil/load";
import { useRecoilValue } from "recoil";
import { initSettingDefault } from "~/recoil/settingDefault";

const { Header, Footer, Sider, Content } = Layout;

const LayoutWebsite = () => {
  const loading = useRecoilValue(initLoad);
  const settingDefault = useRecoilValue(initSettingDefault);
  return (
    <>
      <Layout>
        <Header style={{backgroundColor: settingDefault.backgroundHead}}>
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
    </>
  );
};

export default LayoutWebsite;
