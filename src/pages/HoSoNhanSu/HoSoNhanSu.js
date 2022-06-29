import { Card, Button, message, Upload, Row, Col } from "antd";
import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import './HoSoNhanSu.css'
import { kyc } from "~/api/BaseAPI";
import { documentbg } from "~/components/images";

const HoSoNhanSu = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file[]', file);
    });

    setUploading(true);
      console.log(formData);
      kyc(formData)
      .then(({ data }) => {
        setFileList([]);
        message.success(data.message);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <div className="wr-container document-page" style={{backgroundImage: `url(${documentbg})`}}>
      <Card className="wr-document" title={'Hồ sơ nhân sự'}>
        <Card title="Upload tài liệu" className="box-document">
          <Upload accept="image/png, image/jpeg, image/jpg, .doc, .docx, .pdf , .xlx, .csv" {...props}>
            <Button className="select-document" icon={<CloudUploadOutlined />}>Chọn tài liệu cần tải lên</Button>
          </Upload>
          <Button
            className="btn-document"
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{
              marginTop: 16,
            }}
          >
            {uploading ? 'Đang upload tài liệu' : 'Bắt đầu upload tài liệu'}
          </Button>
        </Card>
      </Card>
    </div>
  );
};
export default HoSoNhanSu;
