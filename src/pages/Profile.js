import { CheckOutlined, CloudUploadOutlined, EditOutlined, IdcardOutlined, KeyOutlined,CommentOutlined, UserOutlined  } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Image, Input, Radio, Row, Select, Spin, Tabs, Typography, notification, Upload,Modal,Avatar,Tooltip ,Popover   } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { initProfile } from "~/recoil/profile";
import { useRecoilState } from "recoil";
import TabChangePassWord from '~/components/Profile/TabChangePassWord';
import TabMessage from '~/components/Profile/TabMessage'
import TabProfile from '~/components/Profile/TabProfile';
const { TabPane } = Tabs;

const Profile = () => {
// popup danh sách sinh nhật
const { TextArea } = Input;
const [isModalVisible, setIsModalVisible] = useState(false);
const [visible, setVisible] = useState(false);
const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};
const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };
///////////////////

    const [profileData, setProfileData] = useRecoilState(initProfile);
    const [loadUpImage, setLoadUpImage] = useState(false);
    const [loadChangePass, setLoadChangePass] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [disabledInput, setDisabledInput] = useState(true);
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);
    const breakpoint = 620;

    useEffect(() => {
        window.addEventListener("resize", () => setWidthScreen(window.innerWidth));
    }, [])
    const profileProps = () => [
        profileData,
        setProfileData,
        loadUpImage,
        setLoadUpImage,
        loadingProfile,
        setLoadingProfile,
        disabledInput,
        setDisabledInput
    ];
    const passwordProps = () => [
        loadChangePass,
        setLoadChangePass
    ];
    console.log(profileData.email);
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Danh sách sinh nhật
            </Button>
      <Modal title="Danh sách sinh nhật" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>
            <Popover
                content={ <><TextArea rows={2} />  <a onClick={hide}>Gửi</a></>}
                title="Gửi lời chúc"
                placement="rightTop"
                trigger="click"
                visible={visible}
                onVisibleChange={handleVisibleChange}
            >
                  <Tooltip placement="top" title={'Tiến Bịp-phòng IT'}> 
                    <Avatar icon={<UserOutlined />} />
                  </Tooltip>
            </Popover>

        </p>
        <p><Avatar icon={<UserOutlined />} /></p>
        <p><Avatar icon={<UserOutlined />} /></p>
      </Modal>
            <Card className="wr-container profile-page">
                <Tabs tabPosition={ breakpoint < widthScreen ? "left" : "top" }  style={{ width: '100%' }} className="tab-wrap-profile">
                    <TabPane tab={<><IdcardOutlined className="tab-icon"/> <span className="tab-icon-lable">Hồ sơ cá nhân</span></>} key="1">
                        <TabProfile profileProps={profileProps()}/>
                    </TabPane>
                    <TabPane tab={<><KeyOutlined className="tab-icon"/><span className="tab-icon-lable">Thay đổi mật khẩu</span></>} key="2">
                        <TabChangePassWord passwordProps={passwordProps()}/>
                    </TabPane>
                    <TabPane tab={<><CommentOutlined className="tab-icon"/><span className="tab-icon-lable">Lời nhắn</span></>} key="3">
                        <TabMessage />
                    </TabPane>
                    {
                        profileData && 
                        <TabPane disabled tab={<>
                            <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=email: ${profileData.email} - Mã NV: ${profileData.employee_code} - Họ và tên: ${profileData.fullname} - Số điện thoại: ${profileData.phone}`}/>
                            <span className="tab-icon-lable">QR Code</span></>} key="3">
                        </TabPane>
                    }
                </Tabs>
            </Card>
        </>
    );
}
export default Profile;
