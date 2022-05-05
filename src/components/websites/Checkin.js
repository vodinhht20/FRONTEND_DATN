import { useEffect, useState } from 'react';
import { EnvironmentOutlined, InfoCircleOutlined, SwapOutlined } from '@ant-design/icons';
import { Card as CardAntd, Col, Form, message, Row, Select, Space, Tooltip} from 'antd';
import { Option } from 'antd/lib/mentions';
import { orange } from '@mui/material/colors';
import { Typography, notification } from 'antd';
import * as React from 'react';
import axios from 'axios';
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import LogoutIcon from '@mui/icons-material/Logout';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Clock from "react-live-clock";

const Checkin = () => {

  const [dataCheckin, setDataCheckin] = useState({});
  const [location, setLocation] = useState({});
  const [workSpace, setWorkSpace] = useState();
  const [disableSelect, setDisableSelect] = useState(true);
  const [circleLoading, setCircleLoading] = useState(false);
  const [statusRes, setStatusRes] = useState(true);
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(false);
  moment.locale('vn');

  useEffect(() => {
    document.title = "Chấm công";
    // call API location
    axios.get('https://api.ipdata.co?api-key=01001158f72f23884238b6b0828bc1edd14985729325a008b06d6670').then(res => {
      setLocation(res.data.asn)
    });

    // call API Checkin
    setDataCheckin({
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
    defaultValue: dataCheckin.work_space || '1',
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
        setDataCheckin({
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

  const openNotification = (type, title, messsage) => {
    const data = {
      message: title,
      description: messsage,
      placement: 'topRight',
    }
    if (type == 'success') {
      notification.success(data);
    } else {
      notification.error(data);
    }
  };

  const handleButtonCheckin = () => {
    if(statusRes) {
      setCircleLoading(true);
      let timeCurrent = `${moment().format('HH:mm')}`;
      if (dataCheckin.type) {
        let startTime = moment(dataCheckin.checkin, 'HH:mm');
        let endTime = moment(timeCurrent, 'HH:mm');
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
          setDataCheckin({
            ...dataCheckin,
            checkout: timeCurrent,
            working_time: workingTime
          });
          openNotification('success', 'Checkout thành công !', `Bạn đã checkout vào lúc ${timeCurrent}`);
        }, 2000)
      } else {
        // call api
        // setdata
        setStatusRes(false);
        setTimeout(() => {
          setCircleLoading(false);
          setStatusRes(true);
          setDataCheckin({
            ...dataCheckin,
            type: 1,
            checkin: timeCurrent
          });
          openNotification('success', 'Checkin thành công !', `Bạn đã checkin vào lúc ${timeCurrent}`);
        }, 2000);
      }
    } else {
      message.warning('Hành động này chúng tôi đang xử lý');
    }
  };

  const buttonSx = {
    ...(dataCheckin.type && {
      bgcolor: orange[500],
      '&:hover': {
        bgcolor: orange[700],
      },
    }),
  };

  const circleLoadingStype = {
    ...(dataCheckin.type && {
        color: `${orange[500]} !important`
    }),
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  }

  return (
    <div className="time-keep" id="time-keep-location">
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
      <CardAntd className="time-keep-main">
        <Row justify="center">
            <Col xs={24} md={20} lg={16} style={{ textAlign: 'center' }}>
              <Title level={3} style={{ marginBlock: '5px' }}>Công Ty Cổ phần Quản Lý Nhân Sự Camel</Title>
              <Text>
                Chúc bạn một ngày làm việc tốt lành 🎉
              </Text>
              <Title level={3} className="main-clock">
                <Clock
                  ticking={true}
                  timezone={"Asia/Ho_Chi_Minh"}
                  format={"HH:mm:ss"}
                />
              </Title>
              <Box className="box-button-time-keep">
                <Box sx={{ m: 1, position: 'relative' }}>
                  <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={handleButtonCheckin}
                    style={{ width: "160px", height: "160px", zIndex: 2}}
                    loading={loading}
                  >
                    {
                      dataCheckin.type ?
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
                  {circleLoading && <CircularProgress size={173} sx={circleLoadingStype} className="around-circle-loading"/>}
                </Box>
              </Box>
              <div className="location-address">
                <Title level={5}>Địa điểm làm việc</Title>
                <Text><EnvironmentOutlined /> {location.name}</Text>
              </div>
              <Row gutter={[12,12]} className="wrap-time-statistic">
                <Col span={8}>
                  <CardAntd variant="outlined" sx={{ width: "100%" }} className="time-item" loading={loading}>
                    <Title level={3}>{dataCheckin.checkin ? dataCheckin.checkin : '--:--'}</Title>
                    <Text>Giờ vào</Text>
                  </CardAntd>
                </Col>
                <Col span={8}>
                  <CardAntd variant="outlined" sx={{ width: "100%" }} className="time-item" loading={loading}>
                    <Title level={3}>{dataCheckin.checkout ? dataCheckin.checkout : '--:--'}</Title>
                    <Text>Giờ ra</Text>
                  </CardAntd>
                </Col>
                <Col span={8}>
                  <CardAntd variant="outlined" sx={{ width: "100%" }} className="time-item" loading={loading}>
                    <Title level={3}>{dataCheckin.working_time ? dataCheckin.working_time : '0.0'}</Title>
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
export default Checkin;
