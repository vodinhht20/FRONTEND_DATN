import { CheckOutlined, CloudUploadOutlined, EditOutlined, IdcardOutlined, KeyOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Image, Input, Radio, Row, Select, Spin, Tabs, Typography, notification, Upload } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { initProfile } from "~/recoil/profileAtom";
import { useRecoilState } from "recoil";
const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const Profile = () => {
    const [profileData, setProfileData] = useRecoilState(initProfile);
    const [loadUpImage, setLoadUpImage] = useState(false);
    const [loadChangePass, setLoadChangePass] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [disabledInput, setDisabledInput] = useState(true);
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);
    const [formChangeProfile] = Form.useForm();
    const [formChangePass] = Form.useForm();
    let inputAvatar= '';
    const breakpoint = 620;

    useEffect(() => {
        window.addEventListener("resize", () => setWidthScreen(window.innerWidth));
    }, [])

    // change profile
    const handleSubmitProfile = (values) => {

        //call api update profile
        setLoadingProfile(true);
        setTimeout(() => {
            setProfileData({...profileData, ...values });
            setDisabledInput(true);
            setLoadingProfile(false);
            //success
            notification.success({
                message: "Cập nhật thành công !",
                description: "Hồ sơ của bạn đã được cập nhật",
                placement: 'topRight'
            });
        }, 2000)
    }

    // change avatar
    const uploadAvatar = (event) => {

        setLoadUpImage(true);
        //call api change image
        setTimeout(() => {
            var reader = new FileReader();
            reader.onload = function(){
                setProfileData({...profileData, avatar: reader.result});
            };
            reader.readAsDataURL(event.target.files[0]);
            setLoadUpImage(false);
            //success
            notification.success({
                message: "Cập nhật thành công !",
                description: "Ảnh đại diện đã được thay đổi",
                placement: 'topRight'
            });
        }, 2000);
    };

    // change password
    const handleSubmitChangePassWord = (values) => {

        // call api change password
        setLoadChangePass(true);
        setTimeout(() => {
            console.log("handle_password: ", values);
            setLoadChangePass(false);
            //success
            formChangePass.resetFields();
            notification.success({
                message: "Cập nhật thành công !",
                description: "Mật khẩu đã được thay đổi",
                placement: 'topRight'
            });
        }, 2000)
    }
    return (
        <>
        <Card className="profile-page">
            <Tabs tabPosition={ breakpoint < widthScreen ? "left" : "top" }  style={{ width: '100%' }} className="tab-wrap-profile">
                <TabPane tab={<><IdcardOutlined className="tab-icon"/> <span className="tab-icon-lable">Hồ sơ cá nhân</span></>} key="1">
                    <Title level={4}>Thông tin cá nhân</Title>
                    <Row>
                        <Col xs={24} md={8} lg={6} className="box-profile-avatar">
                            <Image rootClassName="avatar-profile-around"
                                src={profileData.avatar}/>
                                <input type="file" id='input-file-avatar' ref={input => {inputAvatar=input} } onChange={uploadAvatar} style={{ display: "none" }}/>
                                <Button
                                    className="btn-change-avatar"
                                    type="primary"
                                    shape="round"
                                    icon={<CloudUploadOutlined />}
                                    loading={loadUpImage}
                                    onClick={() => inputAvatar.click()}
                                    htmlFor="input-file-avatar"
                                >
                                    Đổi ảnh đại diện
                                </Button>
                        </Col>
                        <Col xs={24} md={16} lg={18}>
                            <Spin spinning={loadingProfile}>
                                <Form layout="vertical"
                                    onFinish={handleSubmitProfile}
                                    requiredMark={ !disabledInput ? true : "optional" }
                                    initialValues={profileData}
                                    key={profileData}
                                    form={formChangeProfile}
                                >
                                    <Row gutter={[12, 16]}>
                                        <Col xs={24} md={24} lg={12}>
                                            <Form.Item name="fullname" label="Họ và Tên"
                                                rules={[{
                                                    required: true,
                                                    message: 'Vui lòng nhập họ và tên'
                                                }]}
                                            >
                                                <Input placeholder="Họ và Tên" disabled={ disabledInput }/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={24} lg={12}>
                                            <Form.Item name="email" label="Email"
                                                tooltip={
                                                    <>Thông tin không được phép chỉnh sửa.
                                                        Vui lòng liên hệ <a href='/help'>Camel</a> để được hỗ trợ trực tiếp.
                                                    </>
                                                }
                                                rules={[{
                                                    required: true,
                                                    message: 'Vui lòng nhập email'
                                                }]}
                                            >
                                                <Input placeholder="Nhập địa chỉ email ..." disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={24} lg={12}>
                                            <Form.Item name="phone" label="Số điện thoại"
                                                rules={[{
                                                        required: true,
                                                        message: 'Vui lòng nhập số điện thoại'
                                                }]}
                                            >
                                                <Input placeholder="Nhập số điện thoại" disabled={ disabledInput }/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={24} lg={12}>
                                            <Form.Item name="birth_day" label="Ngày sinh"
                                                rules={[{
                                                    required: true,
                                                    message: 'Vui lòng nhập ngày sinh'
                                                }]}
                                            >
                                                <DatePicker style={{ width: "100%"}} format={"YYYY-MM-DD"} disabled={ disabledInput }/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={24} lg={12}>
                                            <Form.Item name="gender" label="Giới tính"
                                                rules={[{
                                                    required: true,
                                                    message: 'Vui lòng lựa chọn giới tính'
                                                }]}
                                            >
                                                <Select disabled={ disabledInput }>
                                                    <Select.Option value="1">Nam</Select.Option>
                                                    <Select.Option value="2">Nữ</Select.Option>
                                                    <Select.Option value="0">Khác</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={24} lg={12}>
                                            <Form.Item label="Mã số thuế cá nhân" name="TIN">
                                                <Input placeholder="*******" disabled={ disabledInput }/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24} style={{ textAlign: "center", marginTop: "10px" }}>
                                            <Button
                                                className="btn-update-profile"
                                                type="primary"
                                                shape="round"
                                                htmlType="button"
                                                icon={ disabledInput ? <EditOutlined /> : <CheckOutlined /> }
                                                onClick={() => disabledInput ? setDisabledInput(false) : formChangeProfile.submit() }
                                            >
                                                {
                                                    disabledInput ? <>Chỉnh sửa</> : <>Xác nhận</>
                                                }
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Spin>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab={<><KeyOutlined className="tab-icon"/><span className="tab-icon-lable">Thay đổi mật khẩu</span></>} key="2">
                    <Title level={4}>Thay đổi mật khẩu</Title>
                    <Spin spinning={loadChangePass}>
                        <Row gutter={[12, 16]}>
                            <Col xs={24} md={16} lg={12}>
                                <Form layout="vertical" form={formChangePass} onFinish={handleSubmitChangePassWord}>
                                    <Row gutter={[0, 14]}>
                                        <Col span={24}>
                                            <Form.Item name="password_old" label="Nhập mật khẩu cũ"
                                                rules={[{
                                                    required: true,
                                                    message: 'Vui lòng nhập mật khẩu cũ'
                                                }]}
                                            >
                                                <Input.Password placeholder="Mật khẩu cũ ..."/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item name="password_new" label="Nhập mật khẩu mới"
                                                rules={[{
                                                    required: true,
                                                    message: 'Vui lòng nhập mật khẩu mới'
                                                }]}
                                            >
                                                <Input.Password placeholder="Nhập mật khẩu mới ..."/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item name="password_re" label="Nhập lại mật khẩu mới"
                                                dependencies={['password_new']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập lại mật khẩu mới'
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                          if (!value || getFieldValue('password_new') === value) {
                                                            return Promise.resolve();
                                                          }
                                                          return Promise.reject(new Error('Mật khẩu mới không trùng khớp'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password placeholder="Nhập lại mật khẩu mới ..."/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24} style={{ textAlign: "center", marginTop: "10px" }}>
                                            <Button
                                                type="primary"
                                                shape="round"
                                                htmlType="submit"
                                                icon={ <CheckOutlined /> }
                                                loading={loadChangePass}
                                            >
                                                Xác nhận
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                            <Col xs={24} md={18} lg={12}>
                                <Paragraph>
                                    <blockquote>
                                        <Text strong>Lưu ý: </Text>
                                        Không nên cung cấp thông tin cá nhân hoặc truy cập các đường link bất thường để tránh bị mất tài khoản
                                    </blockquote>
                                </Paragraph>
                            </Col>
                        </Row>
                    </Spin>
                </TabPane>
            </Tabs>
        </Card>
      </>
    );
}
export default Profile;