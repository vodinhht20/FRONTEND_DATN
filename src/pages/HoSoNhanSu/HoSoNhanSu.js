import { Card, Button, message, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import './HoSoNhanSu.css'

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },

  onChange(info) {
    if (info.file.status !== "uploading") {
      //   console.log(info.file, info.fileList);
    }

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const HoSoNhanSu = () => {
  return (
    <div className="wr-container home-page">
      <Card>
        <h2>
          <strong>HỒ SƠ NHÂN SỰ</strong>
        </h2>
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12} lg={6}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Chọn CMND/CCCD (hai mặt)</Button>
            </Upload>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Chọn bằng cấp (nếu có)</Button>
            </Upload>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Chọn giấy khám sức khỏe</Button>
            </Upload>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Chọn sơ yếu lý lịch</Button>
            </Upload>
          </Col>
        </Row>
        <div className="btn_submit">
            <Button type="primary">Gửi thông tin</Button>
        </div>
      </Card>
    </div>
  );
};
export default HoSoNhanSu;
