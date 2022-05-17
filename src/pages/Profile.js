import { CheckOutlined, CloudUploadOutlined, EditOutlined, IdcardOutlined, KeyOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Image, Input, Radio, Row, Select, Spin, Tabs, Typography, notification, Upload } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { initProfile } from "~/recoil/profileAtom";
import { useRecoilState } from "recoil";
import TabChangePassWord from '~/components/Profile/TabChangePassWord';
import TabProfile from '~/components/Profile/TabProfile';
const { TabPane } = Tabs;

const Profile = () => {
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

    return (
        <>
            <Card className="wr-container profile-page">
                <Tabs tabPosition={ breakpoint < widthScreen ? "left" : "top" }  style={{ width: '100%' }} className="tab-wrap-profile">
                    <TabPane tab={<><IdcardOutlined className="tab-icon"/> <span className="tab-icon-lable">Hồ sơ cá nhân</span></>} key="1">
                        <TabProfile profileProps={profileProps()}/>
                    </TabPane>
                    <TabPane tab={<><KeyOutlined className="tab-icon"/><span className="tab-icon-lable">Thay đổi mật khẩu</span></>} key="2">
                        <TabChangePassWord passwordProps={passwordProps()}/>
                    </TabPane>
                </Tabs>
            </Card>
        </>
    );
}
export default Profile;
