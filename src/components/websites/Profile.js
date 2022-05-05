import { CloudUploadOutlined, IdcardOutlined, KeyOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Image, Input, Radio, Row, Select, Tabs, Typography } from 'antd';
import React, { useState } from 'react';
const { Title } = Typography;
const { TabPane } = Tabs;

const Profile = () => {
    const [loadUpImage, setLoadUpImage] = useState(false);
    return (
      <>
        <Card className="profile-page">
            <Tabs tabPosition="left" style={{ width: '100%' }} className="tab-wrap-profile">
                <TabPane tab={<><IdcardOutlined className="tab-icon"/> <span className="tab-icon-lable">Hồ sơ</span></>} key="1">
                    <Title level={4}>Thông tin cá nhân</Title>
                    <Row>
                        <Col xs={24} md={8} lg={6} className="box-profile-avatar">
                            <Image rootClassName="avatar-profile-around"
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                             <Button
                                className="btn-change-avatar"
                                type="primary"
                                shape="round"
                                icon={<CloudUploadOutlined />}
                                loading={loadUpImage}
                                onClick={() => setLoadUpImage(true)}
                            >
                                Đổi ảnh đại diện 
                            </Button>
                        </Col>
                        <Col xs={24} md={16} lg={18}>
                            <Form layout="vertical">
                                <Row gutter={[12, 16]}>
                                    <Col xs={24} md={24} lg={12}>
                                        <Form.Item label="Họ và Tên">
                                            <Input placeholder="Họ và Tên" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={24} lg={12}>
                                        <Form.Item label="Email">
                                            <Input placeholder="Nhập địa chỉ email ..." />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={24} lg={12}>
                                        <Form.Item label="Số điện thoại" 
                                            tooltip={
                                                <>Thông tin không được phép chỉnh sửa.
                                                    Vui lòng liên hệ <a href='/help'>Camel</a> để được hỗ trợ trực tiếp.
                                                </>
                                            }>
                                            <Input placeholder="Nhập số điện thoại" value={"+84329766459"} disabled/>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={24} lg={12}>
                                        <Form.Item label="Ngày sinh">
                                            <DatePicker  style={{ width: "100%"}}/>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={24} lg={12}>
                                        <Form.Item label="Giới tính">
                                            <Select defaultValue={"1"}>
                                                <Select.Option value="1">Nam</Select.Option>
                                                <Select.Option value="2">Nữ</Select.Option>
                                                <Select.Option value="0">Khác</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={24} lg={12}>
                                        <Form.Item label="Mã số thuế cá nhân">
                                            <Input placeholder="*******" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab={<><KeyOutlined className="tab-icon"/><span className="tab-icon-lable">Mật khẩu</span></>} key="2">
                    Content of Tab 2
                </TabPane>
            </Tabs>
        </Card>
      </>
    );
}
export default Profile;