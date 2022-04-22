import { MoreOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  PageHeader,
  Button,
  Descriptions,
  Dropdown,
  Menu,
  Calendar,
  Badge,
  Card,
} from "antd";

const Timekeep = () => {
  const DropdownMore = () => (
    <Dropdown key="more" overlay={<a>Xem nào </a>} placement="bottomRight">
      <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
    </Dropdown>
  );

  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
        ];
        break;
      case 10:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
          { type: "error", content: "This is error event." },
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "This is warning event" },
          { type: "success", content: "This is very long usual event。。...." },
          { type: "error", content: "This is error event 1." },
          { type: "error", content: "This is error event 2." },
          { type: "error", content: "This is error event 3." },
          { type: "error", content: "This is error event 4." },
        ];
        break;
      default:
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="Thống kê bảng công"
          subTitle="Tháng 04/2022"
          extra={[<DropdownMore key="move" />]}
        >
          <Descriptions>
            <Descriptions.Item label="Tổng công">
              <a>26</a>
            </Descriptions.Item>
            <Descriptions.Item label="Công nghỉ phép">
              <a>3</a>
            </Descriptions.Item>
            <Descriptions.Item label="Công nghỉ lễ">
              <a>1</a>
            </Descriptions.Item>
            <Descriptions.Item label="Công workform home">
              <a>1</a>
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giờ OT">
              <a>10</a>
            </Descriptions.Item>
            <Descriptions.Item label="Nghỉ không lương">
              <a>2</a>
            </Descriptions.Item>
            <Descriptions.Item label="Về sớm">
              <p>
                <a>3 lần </a> ( 35 phút về sớm )
              </p>
            </Descriptions.Item>
            <Descriptions.Item label="Đi muộn">
              <p>
                <a>3 lần </a> ( 35 phút đi muộn )
              </p>
            </Descriptions.Item>
          </Descriptions>
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            locale={{
              lang: {
                locale: "vi_VN",
                month: "Tháng",
                year: "Năm",
                dayFormat: moment.updateLocale("vn", {
                  weekdaysMin: [
                    "Chủ nhật",
                    "Thứ 2",
                    "Thứ 3",
                    "Thứ 4",
                    "Thứ 5",
                    "Thứ 6",
                    "Thứ 7",
                  ]
                }),
              },
            }}
          />
          ;
        </PageHeader>
      </div>
    </>
  );
};
export default Timekeep;
