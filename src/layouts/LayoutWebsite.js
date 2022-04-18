import { Layout, PageHeader } from "antd";
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
          <Outlet />
        </Content>
        <MenuBottom />
      </Layout>
    </>
  );
};

export default LayoutWebsite;
