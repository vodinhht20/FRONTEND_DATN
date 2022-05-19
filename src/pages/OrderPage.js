import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { initLoad } from "~/recoil/loadAtom";
import { initOrder } from "~/recoil/order";

const OrderPage = () => {
  const loading = useRecoilValue(initLoad);

  const order = useRecoilValue(initOrder);

  useEffect(() => {
    document.title = order && order;
    // call API data
  }, []);


  return (
      <Row className="OrderPage-container" gutter={[12, 12]}>
        <Col xs={24} md={24} lg={24}>
          <Card bordered={false} loading={loading}>
            <p className="text-info">Mẫu đơn {order && order}</p>
          </Card>
        </Col>
        <Col xs={24} md={24} lg={24}>
          <Card title={order && order} bordered={false} loading={loading}>
            Đang xây dựng
          </Card>
        </Col>
      </Row>
  );
};
export default OrderPage;
