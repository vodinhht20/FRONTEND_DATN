import { Tabs, Collapse, Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./TabMessage.css";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const text = `
  Chúc mừng sinh nhật
`;
const time = `
  01/01/2022
`;
const onChange = (key) => {
  console.log(key);
};
const tabMessage = () => {
  return (
    <div>
      <Tabs onChange={onChange} type="card">
        <TabPane tab="Lời nhắn đã nhận" key="1">
          <Collapse
            onChange={onChange}
            expandIconPosition="end"
            className="result"
          >
            <Panel
              header={
                <>
                  <Avatar icon={<UserOutlined />} />
                  <span>Tiến Bịp-Phòng IT</span>
                </>
              }
              key="1"
            >
              <Card className="result">
                <div>
                  {" "}
                  <span>Thời gian: </span> {time}
                </div>
                <div>
                  <span>Nội dung: </span>
                  {text}
                </div>
              </Card>
              <Card>
                <div>
                  {" "}
                  <span>Thời gian: </span> {time}
                </div>
                <div>
                  <span>Nội dung: </span>
                  {text}
                </div>
              </Card>
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="Lời nhắn đã gửi" key="2">
        <Collapse
            onChange={onChange}
            expandIconPosition="end"
            className="result"
          >
            <Panel
              header={
                <>
                  <Avatar icon={<UserOutlined />} />
                  <span>Tiến Không Bịp-Phòng IT</span>
                </>
              }
              key="1"
            >
              <Card className="result">
                <div>
                  {" "}
                  <span>Thời gian: </span> {time}
                </div>
                <div>
                  <span>Nội dung: </span>
                  {text}
                </div>
              </Card>
              <Card>
                <div>
                  {" "}
                  <span>Thời gian: </span> {time}
                </div>
                <div>
                  <span>Nội dung: </span>
                  {text}
                </div>
              </Card>
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default tabMessage;
