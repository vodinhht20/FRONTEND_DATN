import { InfoCircleOutlined, SwapOutlined } from '@ant-design/icons';
import { Card, Col, Form, Row, Select, Tooltip} from 'antd';
import { Option } from 'antd/lib/mentions';
import axios from 'axios';
import { useEffect, useState } from 'react';


const Timekeep = () => {

  const [workspace, setWorkspace] = useState('');
  const [location, setLocation] = useState({});
  const [disableSelect, setDisableSelect] = useState(true);
  useEffect(() => {
    // call API
    setWorkspace("Cơ sở 1 Hà Nội");
    axios.get('https://api.ipdata.co?api-key=01001158f72f23884238b6b0828bc1edd14985729325a008b06d6670').then(res => {
      setLocation(res.data.asn)
    })
  }, []);
  const propSelected = {
    defaultValue: '4',
    suffix: (
      <Tooltip title="Cơ sở bạn đang làm việc">
        <InfoCircleOutlined/>
      </Tooltip>
    ),
    disabled: disableSelect,
    onSelect: () => {
      setDisableSelect(true)
    },
  }

  return (
    <>
      <Card size="small" >
        <Form  labelCol={{ span: 6 }} wrapperCol={{ span: 17 }}>
          <Form.Item label="Cơ sở làm việc" >
              <Row align='middle'>
                <Col xs={22} md={20} lg={18}  className="wr-container wrap-item">
                  <Select {...propSelected}>
                    <Option value="1">Cơ sở 1 Nam Từ Liêm, HN</Option>
                    <Option value="2">Cơ sở 2 Ba Đình, HN</Option>
                    <Option value="3">Cơ sở 3 Gia Lâm, HN</Option>
                    <Option value="4">Cơ sở 4 Cầu Giấy, HN</Option>
                  </Select>
                </Col>
                <Col xs={2} md={4} lg={6} >
                  <Tooltip title="Thay đổi nơi làm việc">
                    <SwapOutlined className='icon-change-workpace' onClick={() => {setDisableSelect(false)}}/>
                  </Tooltip>
                </Col>
              </Row>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <p>Địa điểm {location.name}</p>
              <p>IP Wifi: {location.route}</p>
            </Col>
        </Row>
      </Card>
    </>
  );
}
export default Timekeep;