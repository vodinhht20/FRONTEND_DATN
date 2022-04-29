import { InfoCircleOutlined, SwapOutlined } from '@ant-design/icons';
import { Card, Col, ConfigProvider, Form, Row, Select, Tooltip} from 'antd';
import { Option } from 'antd/lib/mentions';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import Clock from "react-live-clock";
import viVN from 'antd/lib/locale/vi_VN';
import { Typography } from 'antd';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

const Timekeep = () => {

  const [workspace, setWorkspace] = useState('');
  const [location, setLocation] = useState({});
  const [disableSelect, setDisableSelect] = useState(true);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const { Title, Text } = Typography;

  useEffect(() => {
    // call API
    setWorkspace("Cơ sở 1 Hà Nội");
    axios.get('https://api.ipdata.co?api-key=01001158f72f23884238b6b0828bc1edd14985729325a008b06d6670').then(res => {
      setLocation(res.data.asn)
    });
    clearTimeout(timer.current);
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

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

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
            <Col xs={24} md={20} lg={16} style={{ textAlign: 'center' }}>
              <Title level={2}>Công ty cổ phần TOPCV</Title>
              <Title level={3} className="main-clock">
                <Clock
                  ticking={true}
                  timezone={"Asia/Ho_Chi_Minh"}
                  format={"HH:mm:ss"}
                />
              </Title>
              <ConfigProvider locale={viVN}>
                <Clock
                  ticking={true}
                  timezone={"Asia/Ho_Chi_Minh"}
                  format={"MMMM Do YYYY"}
                />
              </ConfigProvider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ m: 1, position: 'relative' }}>
                  <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={handleButtonClick}
                    style={{ width: "160px", height: "160px"}}
                  >
                    {success ? <CheckIcon /> : <FingerprintIcon fontSize='large'/>}
                  </Fab>
                  {loading && (
                    <CircularProgress
                      size={173}
                      sx={{
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1,
                      }}
                    />
                    )}
                </Box>
              </Box>
              <Title level={5}>Địa điểm làm việc</Title>
              <Text>{location.name}</Text>
            </Col>
        </Row>
      </Card>
    </>
  );
}
export default Timekeep;
