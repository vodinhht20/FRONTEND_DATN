import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
const { EditOutlined, CheckOutlined, CloudUploadOutlined } = require("@ant-design/icons")
const { Col, Row, Image, Button, Form, DatePicker, Select, Input, Typography, Spin, notification } = require("antd")
const { Title, Paragraph, Text } = Typography;

const TabProfile = ({profileProps}) => {
    const [
        profileData,
        setProfileData,
        loadUpImage,
        setLoadUpImage,
        loadingProfile,
        setLoadingProfile,
        disabledInput,
        setDisabledInput
    ] = profileProps;
    const [formChangeProfile] = Form.useForm();
    let inputAvatar= '';

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

    return (
        <>
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
                                        <DatePicker style={{ width: "100%"}} format={"DD-MM-YYYY"} disabled={ disabledInput } locale={locale}/>
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
        </>
    )
}

export default TabProfile;
