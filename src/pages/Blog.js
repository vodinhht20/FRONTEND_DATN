import { AntDesignOutlined, CheckCircleTwoTone, HomeOutlined, MoreOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Card, Col, Dropdown, Image, PageHeader, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import { getData } from "~/api/BaseAPI";
import DashboardRadar from "~/components/Chart/DashboardRadar";
import DashboardPie from "~/components/Chart/DashboardPie";
import { useRecoilState, useRecoilValue } from "recoil";
import { initDataChart } from "~/recoil/dataChart";
import { initLoad } from "~/recoil/load";
import { Link } from "react-router-dom";

const Blog = () => {
  const [visible, setVisible] = useState(false);
  const loading = useRecoilValue(initLoad);

  const dataChart = useRecoilValue(initDataChart);

  useEffect(() => {
    document.title = "Blog";
    // call API data

  }, []);

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
            <h2 className="text-title"> Cựu kỹ sư Apple giải thích lý do iPhone đời đầu không thể copy/paste, đơn giản vì không làm kịp </h2>
            <div className="user-title">
              <div className="user-title-content">
                <Avatar size={{ xs: 55, sm: 55, md: 55, lg: 55, xl: 55, xxl: 55 }} src="https://workcamel.tk/storage/avatars/whRvR3X3ypdKBv3lMVoI9yPYorFapYEtAkDHEUvr.gif" />
                <div className="name-role">
                  <span className="user-name">Trần Tiến <CheckCircleTwoTone twoToneColor="#52c41a" /></span>
                  <span className="user-role">12/06/2022</span>
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
            <span className="blog-content">
            Thread Twitter của Kocienda thật ra có rất nhiều thông tin giá trị. Một trong số đó là việc iPhone không có tính năng copy/cut/paste. Lý do rất đơn giản, nhóm kỹ sư phát triển hệ điều hành và giao diện thiết bị không kịp hoàn thiện tính năng ấy để kịp thời điểm iPhone ra mắt cuối năm 2007. Hay nói đúng hơn, nếu muốn thì vẫn có, nhưng tính năng ấy sẽ không đảm bảo vận hành hoàn hảo như kỳ vọng của Steve Jobs.

            Vậy là tính năng rất hữu ích đó được dời lại cho phiên bản sau, trong khi nhân sự tại Apple quá bận bịu với những tính năng quan trọng không kém khác, ví dụ như cách bàn phím hoạt động, hay những tính năng như autocorrect hay cách ngón tay của chúng ta tương tác với từng con chữ trên bàn phím cảm ứng. <br></br>

            Mãi đến khi chiếc iPhone đầu tiên ra mắt, các kỹ sư Apple mới bắt đầu làm việc để đem tính năng copy/paste đến với chiếc điện thoại mà họ phát triển.<br></br>
            Thread Twitter của Kocienda thật ra có rất nhiều thông tin giá trị. Một trong số đó là việc iPhone không có tính năng copy/cut/paste. Lý do rất đơn giản, nhóm kỹ sư phát triển hệ điều hành và giao diện thiết bị không kịp hoàn thiện tính năng ấy để kịp thời điểm iPhone ra mắt cuối năm 2007. Hay nói đúng hơn, nếu muốn thì vẫn có, nhưng tính năng ấy sẽ không đảm bảo vận hành hoàn hảo như kỳ vọng của Steve Jobs.

            Vậy là tính năng rất hữu ích đó được dời lại cho phiên bản sau, trong khi nhân sự tại Apple quá bận bịu với những tính năng quan trọng không kém khác, ví dụ như cách bàn phím hoạt động, hay những tính năng như autocorrect hay cách ngón tay của chúng ta tương tác với từng con chữ trên bàn phím cảm ứng.

            Mãi đến khi chiếc iPhone đầu t
            
            Thread Twitter của Kocienda thật ra có rất nhiều thông tin giá trị. Một trong số đó là việc iPhone không có tính năng copy/cut/paste. Lý do rất đơn giản, nhóm kỹ sư phát triển hệ điều hành và giao diện thiết bị không kịp hoàn thiện tính năng ấy để kịp thời điểm iPhone ra mắt cuối năm 2007. Hay nói đúng hơn, nếu muốn thì vẫn có, nhưng tính năng ấy sẽ không đảm bảo vận hành hoàn hảo như kỳ vọng của Steve Jobs.

            Vậy là tính năng rất hữu ích đó được dời lại cho phiên bản sau, trong khi nhân sự tại Apple quá bận bịu với những tính năng quan trọng không kém khác, ví dụ như cách bàn phím hoạt động, hay những tính năng như autocorrect hay cách ngón tay của chúng ta tương tác với từng con chữ trên bàn phím cảm ứng. <br></br>

            Mãi đến khi chiếc iPhone đầu tiên ra mắt, các kỹ sư Apple mới bắt đầu làm việc để đem tính năng copy/paste đến với chiếc điện thoại mà họ phát triển.<br></br>
            Thread Twitter của Kocienda thật ra có rất nhiều thông tin giá trị. Một trong số đó là việc iPhone không có tính năng copy/cut/paste. Lý do rất đơn giản, nhóm kỹ sư phát triển hệ điều hành và giao diện thiết bị không kịp hoàn thiện tính năng ấy để kịp thời điểm iPhone ra mắt cuối năm 2007. Hay nói đúng hơn, nếu muốn thì vẫn có, nhưng tính năng ấy sẽ không đảm bảo vận hành hoàn hảo như kỳ vọng của Steve Jobs.

            Vậy là tính năng rất hữu ích đó được dời lại cho phiên bản sau, trong khi nhân sự tại Apple quá bận bịu với những tính năng quan trọng không kém khác, ví dụ như cách bàn phím hoạt động, hay những tính năng như autocorrect hay cách ngón tay của chúng ta tương tác với từng con chữ trên bàn phím cảm ứng.

            Mãi đến khi chiếc iPhone đầu tiên ra mắ
            
            Thread Twitter của Kocienda thật ra có rất nhiều thông tin giá trị. Một trong số đó là việc iPhone không có tính năng copy/cut/paste. Lý do rất đơn giản, nhóm kỹ sư phát triển hệ điều hành và giao diện thiết bị không kịp hoàn thiện tính năng ấy để kịp thời điểm iPhone ra mắt cuối năm 2007. Hay nói đúng hơn, nếu muốn thì vẫn có, nhưng tính năng ấy sẽ không đảm bảo vận hành hoàn hảo như kỳ vọng của Steve Jobs.

            Vậy là tính năng rất hữu ích đó được dời lại cho phiên bản sau, trong khi nhân sự tại Apple quá bận bịu với những tính năng quan trọng không kém khác, ví dụ như cách bàn phím hoạt động, hay những tính năng như autocorrect hay cách ngón tay của chúng ta tương tác với từng con chữ trên bàn phím cảm ứng. <br></br>

            Mãi đến khi chiếc iPhone đầu tiên ra mắt, các kỹ sư Apple mới bắt đầu làm việc để đem tính năng copy/paste đến với chiếc điện thoại mà họ phát triển.<br></br>
            Thread Twitter của Kocienda thật ra có rất nhiều thông tin giá trị. Một trong số đó là việc iPhone không có tính năng copy/cut/paste. Lý do rất đơn giản, nhóm kỹ sư phát triển hệ điều hành và giao diện thiết bị không kịp hoàn thiện tính năng ấy để kịp thời điểm iPhone ra mắt cuối năm 2007. Hay nói đúng hơn, nếu muốn thì vẫn có, nhưng tính năng ấy sẽ không đảm bảo vận hành hoàn hảo như kỳ vọng của Steve Jobs.

            Vậy là tính năng rất hữu ích đó được dời lại cho phiên bản sau, trong khi nhân sự tại Apple quá bận bịu với những tính năng quan trọng không kém khác, ví dụ như cách bàn phím hoạt động, hay những tính năng như autocorrect hay cách ngón tay của chúng ta tương tác với từng con chữ trên bàn phím cảm ứng.

            Mãi đến khi chiếc iPhone đầu tiên ra mắiên ra mắt, các kỹ sư Apple mới bắt đầu làm việc để đem tính năng copy/paste đến với chiếc điện thoại mà họ phát triển.
            </span>
          </Card>
        </Col>

        <Col xs={24} md={6} lg={6}>
          <Card title="Xem nhanh" className="posts-fast-all" style={{height: '100%', width: '100%'}} bordered={false} loading={loading}>
            <Link to={"/"} className="post-fast">
              <h4 className="post-fast-title">Liệu iPhone 14 series sẽ có pin dung lượng cao hơn, trừ bản Pro Max? Liệu iPhone 14 series sẽ có pin dung lượng cao hơn, trừ bản Pro Max?</h4>
              <div className="post-fast-img">
                <img width='100%' src="https://photo2.tinhte.vn/data/attachment-files/2022/06/6031898_VMM-Vietnam-Mountain-Marathon-44-2048x1365.jpeg" />
              </div>
            </Link>
            <Link to={"/"} className="post-fast">
              <h4 className="post-fast-title">Liệu iPhone 14 series sẽ có pin dung lượng cao hơn, trừ bản Pro Max? Liệu iPhone 14 series sẽ có pin dung lượng cao hơn, trừ bản Pro Max?</h4>
              <div className="post-fast-img">
                <img width='100%' src="https://photo2.tinhte.vn/data/attachment-files/2022/06/6032311_Tinhte_Game4.jpg" />
              </div>
            </Link>
            <Link to={"/"} className="post-fast">
              <h4 className="post-fast-title">Liệu iPhone 14 series sẽ có pin dung lượng cao hơn, trừ bản Pro Max? Liệu iPhone 14 series sẽ có pin dung lượng cao hơn, trừ bản Pro Max?</h4>
              <div className="post-fast-img">
                <img width='100%' src="https://photo2.tinhte.vn/data/attachment-files/2022/06/6032309_Tinhte_Game3.jpg" />
              </div>
            </Link>
            <Link to={"/"} className="post-fast">
              <h4 className="post-fast-title">Liệu iPhone 14 series sẽ có pin dung lượng cao hơn, trừ bản Pro Max? Liệu iPhone 14 series sẽ có pin dung lượng cao hơn, trừ bản Pro Max?</h4>
              <div className="post-fast-img">
                <img width='100%' src="https://photo2.tinhte.vn/data/attachment-files/2022/06/6032298_Tinhte_Game1.jpg" />
              </div>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Blog;
