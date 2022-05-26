import { CaretRightFilled } from "@ant-design/icons";
import { Badge, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { initListOrder } from "~/recoil/listOrder";
import { initLoad } from "~/recoil/load";
import { initOrder } from "~/recoil/order";

const CreateOrder = () => {
  const [visible, setVisible] = useState(false);
  const loading = useRecoilValue(initLoad);

  const listOrder = useRecoilValue(initListOrder);
  const setOrder = useSetRecoilState(initOrder);

  return (
      <Row className="CreateOrder-container" gutter={[12, 12]}>
        <Col xs={24} md={24} lg={24}>
          <Card bordered={false} loading={loading}>
            <p className="text-info">Vui lòng chọn mẫu đơn</p>
          </Card>
        </Col>
        <Col xs={24} md={24} lg={24}>
          <Card title="Vui lòng chọn loại đơn" bordered={false} loading={loading}>
            {listOrder && listOrder.map(item =>
              <Badge.Ribbon text="Đang mở" key={item.id}>
                <Link onClick={() => setOrder(item.name)} to={item.link} className="one-order">
                  <div className="title-order">{item.name}</div>
                  <CaretRightFilled className="icon-order" />
                </Link>
              </Badge.Ribbon>
              )}
          </Card>
        </Col>
      </Row>
  );
};
export default CreateOrder;
