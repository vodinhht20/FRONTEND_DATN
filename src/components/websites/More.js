import { Avatar, Badge, Col, Divider, Row } from "antd";
const style = {
  backgroundColor: "red",
  height: "18vw",
};
const More = () => {
  return (
    <div className="more">
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Badge count={99}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge count={99}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge count={99}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge count={99}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <Badge count={99}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge count={99}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge count={99}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
        <Col className="gutter-row" span={6}>
          <Badge count={99}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Col>
      </Row>
    </div>
  );
};
export default More;
