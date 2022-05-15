import { formatDate, getDate } from "~/commons/formatDate";
import { Typography, notification } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Card as CardAntd, Col, message, Row, Space} from 'antd';
import { orange } from '@mui/material/colors';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import LogoutIcon from '@mui/icons-material/Logout';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Clock from "react-live-clock";

const { Title, Text } = Typography;

const Checkin = ( { handleProps } ) => {
  const [
    dataCheckin,
    setDataCheckin,
    setCircleLoading,
    loading,
    circleLoading
] = handleProps;
  const [statusRes, setStatusRes] = useState(true);

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
          let timeCurrent = `${formatDate(null, 'HH:mm')}`;
          if (dataCheckin.type) {
            let startTime = getDate(dataCheckin.checkin, 'HH:mm');
            let endTime = getDate(timeCurrent, 'HH:mm');
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
                    <Text><EnvironmentOutlined /> {dataCheckin.location}</Text>
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