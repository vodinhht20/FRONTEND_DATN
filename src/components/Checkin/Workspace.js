import { Option } from 'antd/lib/mentions';
import { InfoCircleOutlined, SwapOutlined } from '@ant-design/icons';
import { Form, Select, Tooltip } from "antd";
import { Card as CardAntd, Col, message, Row, Space} from 'antd';

const Workspace = ( { handleProps } ) => {
    const [
        setDisableSelect,
        disableSelect,
        dataCheckin,
        setDataCheckin,
        setLoading,
        setWorkSpace,
        setCircleLoading
    ] = handleProps;

    const propSelected = {
        defaultValue: dataCheckin.work_space || '1',
        suffix: (
          <Tooltip title="Cơ sở bạn đang làm việc">
            <InfoCircleOutlined/>
          </Tooltip>
        ),
        disabled: disableSelect,
        onSelect: (e) => {
          setDisableSelect(true);
          setCircleLoading(true);
          // call api
          setLoading(true);
          setTimeout(() => {
            setWorkSpace(e);
            setLoading(false);
            setCircleLoading(false);
            setDataCheckin({
              type: 0, // trạng thái checkin 0 chưa checkin, 1 đã checkin
              fullname: "Võ Văn Định",
              checkin: null, // thời gian checkin vd: 08:30 default null
              checkout: null, // thời gian checkout vd: 08:30 default null
              working_time: null, // tổng thời gian làm
              date: "30/04/2022",
              work_space: '4' // id cơ sở làm việc
            });
          }, 2000);
        },
    }
    return (
        <CardAntd size="small" >
            <Form  labelCol={{ span: 6 }} wrapperCol={{ span: 17 }}>
            <Form.Item label="Cơ sở làm việc" >
                <Row align='middle'>
                    <Col xs={22} md={20} lg={18}  className="wr-container wrap-item">
                    <Select {...propSelected}>
                        <Option value="1">Cơ sở 1 Nam Từ Liêm, HN</Option>
                        <Option value="2">Cơ sở 2 Ba Đình, HN</Option>
                        <Option value="3">Cơ sở 3 Gia Lâm, HN</Option>
                        <Option value="4">Cơ sở 4 Cầu Giấy, HN</Option>
                    </Select>
                    </Col>
                    <Col xs={2} md={4} lg={6} >
                    <Tooltip title="Thay đổi nơi làm việc">
                        <SwapOutlined className='icon-change-workpace' onClick={() => {setDisableSelect(false)}}/>
                    </Tooltip>
                    </Col>
                </Row>
            </Form.Item>
            </Form>
        </CardAntd>
    );
}
export default Workspace;