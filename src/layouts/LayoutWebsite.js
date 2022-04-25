import { Col, Layout, PageHeader, Row } from "antd";
import { Outlet } from "react-router-dom";
import Head from "../components/Head";
import MenuBottom from "../components/MenuBottom";

const { Header, Footer, Sider, Content } = Layout;

const LayoutWebsite = () => {
  return (
    <>
      <Layout>
        <Header>
          <Head />
        </Header>
        <Content className="content-wrapper">
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
