const { CheckOutlined } = require("@ant-design/icons");
const { Spin, Row, Col, Form, Input, Button, Typography, notification } = require("antd");
const { Title, Paragraph, Text } = Typography;


const TabChangePassWord = ({passwordProps}) => {
    const [
        loadChangePass,
        setLoadChangePass
    ] = passwordProps;

    const [formChangePass] = Form.useForm();

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
    </>
    )
}

export default TabChangePassWord;
