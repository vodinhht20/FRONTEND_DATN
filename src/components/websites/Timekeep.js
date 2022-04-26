import { InfoCircleOutlined, ShopOutlined, SwapOutlined } from '@ant-design/icons';
import { Badge, Card, Col, Form, Input, Row, Space, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';


const Timekeep = () => {

  const [workspace, setWorkspace] = useState('');
  useEffect(() => {
    // call API
    setWorkspace("Cơ sở 1 Hà Nội");
  }, [])
  return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Badge.Ribbon text="Cơ sở">
          <Card size="small" >
          <Form  labelCol={{ span: 6 }} wrapperCol={{ span: 17 }}>
            <Form.Item label="Cơ sở làm việc" >
                <Row align='middle'>
                  <Col span={18} className="wr-container wrap-item">
                    <Input prefix={<ShopOutlined />} suffix={
                        <Tooltip title="Cơ sở bạn đang làm việc">
                          <InfoCircleOutlined/>
                        </Tooltip>
                      }
                      value={workspace}
                      disabled={true}
                    />
                  </Col>
                  <Col span={6}>
                    <Tooltip title="Thay đổi nơi làm việc">
                      <SwapOutlined className='icon-change-workpace'/>
                    </Tooltip>
                  </Col>
                </Row>
            </Form.Item>
          </Form>
          </Card>
        </Badge.Ribbon>
      </Space>
  );
}
export default Timekeep;