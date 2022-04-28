import { MoreOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Checkbox, Col, Dropdown, PageHeader, Radio, Row } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateOrder = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
      console.log(data);
  };
  useEffect(() => {
    // call API data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const DropdownMore = () => (
    <Dropdown
      key="more"
      overlay={<a onClick={() => setVisible(true)}>Báo cáo</a>}
      placement="bottomRight"
    >
      <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
    </Dropdown>
  );

  return (
    <div className="CreateOrder">
      <PageHeader
        ghost={false}
        title="Tạo đơn"
        extra={[<DropdownMore key="move" />]}
      />

      <Row className="CreateOrder-container" gutter={[12, 12]}>
        <Col xs={24} md={24} lg={24}>
          <Card bordered={false} loading={loading}>
            <p className="text-info">Ghi rõ lý do vào chú thích nếu có</p>
          </Card>
        </Col>
        <Col xs={24} md={24} lg={24}>
          <Card title="Trình tạo đơn" bordered={false} loading={loading}>
            <span className="text-info">
              <form className="form-create-order" onSubmit={handleSubmit(onSubmit)}>
                <input placeholder={'Kính gửi *'} className="form-input" {...register("manager_name", {required: true})} />
                {errors.manager_name && <Alert message="Trường này không được để trống" type="error" showIcon />}
                <input placeholder={'Tôi tên là: *'} className="form-input" {...register("name", {required: true})} />
                {errors.name && <Alert message="Trường này không được để trống" type="error" showIcon />}

                <div className="sex">
                    <span className="text-sex">Giới tính: </span>
                    <div className="radio-check">
                        <span>Nam:</span> <input value="nam" type="radio" {...register("sex", {required: true})}/>
                    </div>
                    <div className="radio-check">
                        <span>Nữ:</span> <input value="nu" type="radio" {...register("sex", {required: true})}/>
                    </div>
                </div>
                {errors.sex && <Alert message="Trường này không được để trống" type="error" showIcon />}

                <div className="date">
                    <span>Thời gian nghỉ:</span>
                    <div class="date-small">
                        <span>Từ:</span>
                        <input placeholder={'Giới tính *'} className="form-input" type="date" {...register("date_time_from", {required: true})} />
                        {errors.date_time_from && <Alert message="Trường này không được để trống" type="error" showIcon />}
                    </div>
                    <div class="date-small">
                        <span>Đến:</span>
                        <input placeholder={'Giới tính *'} className="form-input" type="date" {...register("date_time_to", {required: true})} />
                        {errors.date_time_to && <Alert message="Trường này không được để trống" type="error" showIcon />}
                    </div>
                </div>
                <textarea {...register("lydo", {required: true})} className="form-input lydo" placeholder="Lý do"/>
                <Checkbox {...register("dongy", {required: true})} >Tôi xác nhận những điều tôi khai phía trên là đúng sự thật. tôi xin hoàn toàn chịu trách nhiệm với bất cứ sai sót nào</Checkbox>
                {errors.dongy && <Alert message="Vui lòng tích vào ô xác nhận" type="error" showIcon />}
                <input className="btn" type="submit" />
              </form>
            </span>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default CreateOrder;
