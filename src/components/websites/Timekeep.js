import { EnvironmentOutlined, InfoCircleOutlined, SwapOutlined } from '@ant-design/icons';
import { Card as CardAntd, Col, ConfigProvider, Form, message, Row, Select, Space, Tooltip} from 'antd';
import { Option } from 'antd/lib/mentions';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { orange } from '@mui/material/colors';
import Card from '@mui/material/Card';
import Fab from '@mui/material/Fab';
import Clock from "react-live-clock";
import viVN from 'antd/lib/locale/vi_VN';
import { Typography } from 'antd';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LogoutIcon from '@mui/icons-material/Logout';
import moment from "moment";

const Timekeep = () => {

  const [dataTimekeep, setDataTimekeep] = useState({});
  const [location, setLocation] = useState({});
  const [workSpace, setWorkSpace] = useState();
  const [disableSelect, setDisableSelect] = useState(true);
  const [typeCircleLoading, setCircleLoading] = useState(false);
  const [statusRes, setStatusRes] = useState(true);
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(false);
  moment.locale('vn'); 
  useEffect(() => {

    // call API location
    axios.get('https://api.ipdata.co?api-key=01001158f72f23884238b6b0828bc1edd14985729325a008b06d6670').then(res => {
      setLocation(res.data.asn)
    });

    // call API timekeep
    setDataTimekeep({
      type: 0, // trạng thái checkin 0 chưa checkin, 1 đã checkin
      fullname: "Võ Văn Định",
      checkin: null, // thời gian checkin vd: 08:30 default null
      checkout: null, // thời gian checkout vd: 08:30 default null
      working_time: null, // tổng thời gian làm 
      date: "30/04/2022",
      work_space: '4' // id cơ sở làm việc
    });
  }, []);

  const propSelected = {
    defaultValue: dataTimekeep.work_space || '1',
    suffix: (
      <Tooltip title="Cơ sở bạn đang làm việc">
        <InfoCircleOutlined/>
      </Tooltip>
    ),
    disabled: disableSelect,
    onSelect: (e) => {
      setDisableSelect(true);
      setCircleLoading(true);
      // call api
      setLoading(true);
      setTimeout(() => {
        setWorkSpace(e);
        setLoading(false);
        setCircleLoading(false);
        setDataTimekeep({
          type: 0, // trạng thái checkin 0 chưa checkin, 1 đã checkin
          fullname: "Võ Văn Định",
          checkin: null, // thời gian checkin vd: 08:30 default null
          checkout: null, // thời gian checkout vd: 08:30 default null
          working_time: null, // tổng thời gian làm 
          date: "30/04/2022",
          work_space: '4' // id cơ sở làm việc
        });
      }, 2000);
    },
  }

  const handleButtonTimekeep = () => {
    if(statusRes) {
      setCircleLoading(true);
      if (dataTimekeep.type) {
        let checkout = `${moment().format('HH:mm')}`;
        let startTime = moment(dataTimekeep.checkin, 'HH:mm');
        let endTime = moment(checkout, 'HH:mm');
        let workingTime = endTime.diff(startTime, 'hours', true);
        if(workingTime) {
          workingTime = workingTime.toFixed(1);
        } else {
          workingTime = null;
        }
  
        // call api
        setStatusRes(false);
        setTimeout(() => {
          setCircleLoading(false);
          setStatusRes(true);
          setDataTimekeep({
            ...dataTimekeep,
            checkout,
            working_time: workingTime
          })
        }, 2000)
      } else {
        // call api
        // setdata
        setStatusRes(false);
        setTimeout(() => {
          setCircleLoading(false);
          setStatusRes(true);
          setDataTimekeep({
            ...dataTimekeep,
            type: 1,
            checkin: `${moment().format('HH:mm')}`
          })
        }, 2000);
      }
    } else {
      message.warning('Hành động này chúng tôi đang xử lý');
    }
  };

  const buttonSx = {
    ...(dataTimekeep.type && {
      bgcolor: orange[500],
      '&:hover': {
        bgcolor: orange[700],
      },
    }),
  };

  const circleLoading = {
    ...(dataTimekeep.type && {
        color: `${orange[500]} !important`
    }),
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  }

  return (
    <div className="time-keep">
      <CardAntd size="small" >
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
      </CardAntd>
      <CardAntd>
        <Row justify="center">
            <Col xs={24} md={20} lg={16} style={{ textAlign: 'center' }}>
              <Title level={3} style={{ marginBlock: '5px' }}>Công ty cổ phần TOPCV</Title>
              <ConfigProvider locale={viVN}>
                Chúc bạn một ngày làm việc tốt lành 🎉
              </ConfigProvider>
              <Title level={3} className="main-clock">
                <Clock
                  ticking={true}
                  timezone={"Asia/Ho_Chi_Minh"}
                  format={"HH:mm:ss"}
                />
              </Title>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="box-button-time-keep">
                <Box sx={{ m: 1, position: 'relative' }}>
                  <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={handleButtonTimekeep}
                    style={{ width: "160px", height: "160px", zIndex: 2}}
                    loading={loading}
                  >
                    {
                      dataTimekeep.type ? 
                      <Space className="button-content">
                        <LogoutIcon  className="button-icon"/>
                        <Text className="lable-button">Check out</Text>
                      </Space> : 
                      <Space className="button-content">
                          <FingerprintIcon fontSize='large' className="button-icon"/>
                          <Text className="lable-button">Check in</Text>
                      </Space>
                    }
                  </Fab>
                  {typeCircleLoading && <CircularProgress size={173} sx={circleLoading} />}
                </Box>
              </Box>
              <div className="location-address">
                <Title level={5}>Địa điểm làm việc</Title>
                <Text><EnvironmentOutlined /> {location.name}</Text>
              </div>
              <Row gutter={[12,12]} className="wrap-time-statistic">
                <Col span={8}>
                  <CardAntd variant="outlined" sx={{ width: "100%" }} className="time-item" loading={loading}>
                    <Title level={3}>{dataTimekeep.checkin ? dataTimekeep.checkin : '--:--'}</Title>
                    <Text>Giờ vào</Text>
                  </CardAntd>
                </Col>
                <Col span={8}>
                  <CardAntd variant="outlined" sx={{ width: "100%" }} className="time-item" loading={loading}>
                    <Title level={3}>{dataTimekeep.checkout ? dataTimekeep.checkout : '--:--'}</Title>
                    <Text>Giờ ra</Text>
                  </CardAntd>
                </Col>
                <Col span={8}>
                  <CardAntd variant="outlined" sx={{ width: "100%" }} className="time-item" loading={loading}>
                    <Title level={3}>{dataTimekeep.working_time ? dataTimekeep.working_time : '0.0'}</Title>
                    <Text>Số giờ đã làm</Text>
                  </CardAntd>
                </Col>
              </Row>
            </Col>
        </Row>
      </CardAntd>
    </div>
  );
}
export default Timekeep;
