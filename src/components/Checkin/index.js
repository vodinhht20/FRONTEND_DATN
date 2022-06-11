import { formatDate, getDate } from "~/commons/formatDate";
import { Typography, notification } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Card as CardAntd, Col, message, Row, Space} from 'antd';
import { orange } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import LogoutIcon from '@mui/icons-material/Logout';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Clock from "react-live-clock";
import { checkIn, locationOCG } from "~/api/BaseAPI";
import { initLoad } from "~/recoil/load";
import { useRecoilValue } from "recoil";
import { initLocation } from "~/recoil/location";
import axios from "axios";

const { Title, Text } = Typography;
const Checkin = ( { handleProps } ) => {
  const locationValue = useRecoilValue(initLocation);
  const loadingCard = useRecoilValue(initLoad);
  const [
    dataCheckin,
    setDataCheckin,
    setCircleLoading,
    loading,
    circleLoading,
    location
  ] = handleProps;
  const [statusRes, setStatusRes] = useState(true);
  const [locationAdress, setLocationAdress] = useState('Không thể xác định được vị trí');

  useEffect(() => {
    if (locationValue) {
      const query = `${locationValue.latitude}+${locationValue.longitude}`;
      locationOCG(query).then(({ data }) => {
        let address = data.results[0].formatted;
        setLocationAdress(address);
      });
    }
  }, []);

    const circleLoadingStype = {
        ...(dataCheckin.type && {
            color: `${orange[500]} !important`
        }),
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1
    }

    const buttonSx = {
        ...(dataCheckin.type && {
          bgcolor: orange[500],
          '&:hover': {
            bgcolor: orange[700],
          },
        }),
    };

    const handleButtonCheckin = () => {
        if(statusRes) {
          setCircleLoading(true);
          setStatusRes(false);
          checkIn(location)
            .then(({ data }) => {
              if (data.status == 'success') {
                let resDataCheckin = data.data;
                setDataCheckin({
                  ...dataCheckin,
                  type: resDataCheckin.type,
                  checkin: resDataCheckin.checkin,
                  checkout: resDataCheckin.checkout,
                  working_time: resDataCheckin.working_time

                });
                openNotification('success', 'Checkin thành công !', `Bạn đã ${ resDataCheckin.type ? 'checkin' : 'checkout' } thành công`);
              } else{
                openNotification('warning', data.message + ' ip: ' + data.ip);
              }
              setStatusRes(true);
              setCircleLoading(false);
            })
            .catch((error) => {
              openNotification('warning', error.response.data.message);
              setStatusRes(true);
              setCircleLoading(false);
            })
        } else {
          message.warning('Hành động này chúng tôi đang xử lý');
        }
    };


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

    return (
        <CardAntd className="time-keep-main" loading={loadingCard}>
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
                    <Text><EnvironmentOutlined style={{ paddingRight: '10px' }}/>{ locationAdress }</Text>
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
    )
}
export default Checkin;
