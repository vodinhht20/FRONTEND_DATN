import { AntDesignOutlined, CheckCircleTwoTone, HomeOutlined, MoreOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Card, Col, Dropdown, Image, PageHeader, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import { getData, getData2 } from "~/api/BaseAPI";
import DashboardRadar from "~/components/Chart/DashboardRadar";
import DashboardPie from "~/components/Chart/DashboardPie";
import { useRecoilState, useRecoilValue } from "recoil";
import { initDataChart } from "~/recoil/dataChart";
import { initLoad } from "~/recoil/load";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "~/commons/formatDate";
import { initBLog } from "~/recoil/blog";

const Blog = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useRecoilState(initLoad);
  const [article, setArticle] = useState('');
  const [blog, setBlog] = useRecoilState(initBLog);

  const { slug } = useParams();
  useEffect(() => {
    setLoading(true);
    document.title = "Blog";
    // call API data
    getData2("blog/"+slug)
    .then(({ data }) => {
      setArticle(data.data);
      if (blog) {
        const blogFilter = blog.filter(item => item.slug != slug);
        setBlog(blogFilter);
      }
      setLoading(false);
    });

  }, [slug]);

  return (
    <div className="wr-container blog">
      <Breadcrumb>
      <Breadcrumb.Item href="">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="">
        <span>Tin tức</span>
      </Breadcrumb.Item>
    </Breadcrumb>

      <Row className="dashboard-container" gutter={[12, 12]}>
        <Col xs={24} md={24} lg={24}>
          <Card bordered={false} loading={loading} className="top-blog">
            <h2 className="text-title"> {article && article?.title} </h2>
            <div className="user-title">
              <div className="user-title-content">
                <Avatar size={{ xs: 55, sm: 55, md: 55, lg: 55, xl: 55, xxl: 55 }} src={process.env.REACT_APP_LINK_SERVER+article?.employee?.avatar} />
                <div className="name-role">
                  <span className="user-name">{article && article?.employee?.fullname} <CheckCircleTwoTone twoToneColor="#52c41a" /></span>
                  <span className="user-role">{formatDate(article?.created_at, 'DD/MM/YYYY')} </span>
                </div>
              </div>
              <div className="user-title-content">
                  <Tag color="#f50">#Tin nội bộ</Tag>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={18} lg={18}>
          <Card bordered={false} loading={loading}>
            <span className="blog-content" dangerouslySetInnerHTML={{__html: article && article?.content}}></span>
          </Card>
        </Col>

        <Col xs={24} md={6} lg={6}>
          <Card title="Xem nhanh" className="posts-fast-all" style={{height: '100%', width: '100%'}} bordered={false} loading={loading}>
            {
              blog && blog.map((item) => {
                return (
                  <Link to={`/blog/${item?.slug}`} className="post-fast">
                    <h4 className="post-fast-title">{item?.title}</h4>
                    <div className="post-fast-img">
                      <img width='100%' src={process.env.REACT_APP_LINK_SERVER+item?.images} />
                    </div>
                  </Link>
                )
              })
            }
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Blog;
