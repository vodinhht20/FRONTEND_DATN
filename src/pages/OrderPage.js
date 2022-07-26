import { Avatar, Button, Card, Col, Form, List, message, Row, DatePicker, Spin, Alert, Input, Badge, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { initLoad } from "~/recoil/load";
import { initOrder } from "~/recoil/order";
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import Loading from "~/components/Global/Loading";
import { getData2, requests } from "~/api/BaseAPI";
import { useNavigate, useParams } from "react-router-dom";
import { FileImageFilled, UploadOutlined } from "@ant-design/icons";
import { ImageListItem } from "@mui/material";
import Order1 from "./templateOrders/Order1";
import Order2 from "./templateOrders/Order2";
const { RangePicker } = DatePicker;

const OrderPage = () => {
  const loading = useRecoilValue(initLoad);
  const setLoading = useSetRecoilState(initLoad);
  const [totalVacations, setTotalVacations] = useState(0);
  const [totalText, setTotalText] = useState('Ngày');
  const [active, setActive] = useState('');
  const [approver, setApprover] = useState([]);
  const [loadingApprover, setLoadingApprover] = useState(true);
  const [fileList, setFileList] = useState([]);
  
  const [order, setOrder] = useRecoilState(initOrder);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!order) {
      getData2("list-single-type/"+id)
      .then(({ data }) => {
        setOrder(data.payload);
      });
    };
    document.title = order && order.name;
    // call API data
    getData2('list-approver/'+id)
    .then(({ data }) => {
      setApprover(data.payload)
      setLoadingApprover(false)
    })
  }, []);

  const onFinish = (values) => {
    console.log(values);
    setLoading(true);
    setActive('active');
    const date = [
      moment(values.date[0]).format("YYYY-MM-DD H:m:s"),
      moment(values.date[1]).format("YYYY-MM-DD H:m:s")
    ];

    const formData = new FormData();
    fileList.forEach((file) => {
      console.log(file);
      formData.append('file[]', file);
    });

    requests({...values, date, id, formData})
    .then(({ data }) => {
      setLoading(false);
      setActive('');
      message.success(data.message);
    })
    .then(() => {
      navigate('/more/create-order');
    })
    .catch((error) => {
      setLoading(false);
      setActive('');
      message.warning(error.response.data.message);
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.warning(errorInfo.errorFields[0].errors);
  };

  function disabledDate(current) {
    let customDate = moment().format("YYYY-MM-DD");
    return current && current < moment(customDate, "YYYY-MM-DD");
  }

  const CountTotal = (value) => {
    setTotalVacations(0);
    if (value) {
      if (value[0] != null && value[1] != null) {
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        let tong = Math.round((value[1]._d.getTime() - value[0]._d.getTime()) / day);
        if (tong <= 0) {
          tong = ((value[1]._d.getTime() - value[0]._d.getTime()) / hour).toFixed(1);
          setTotalText('Giờ');
        }else{
          setTotalText('Ngày');
        }
        setTotalVacations(tong);
      }
    }
  }

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

  const orderRender = () => {
    if (order && order.type == 2) {
      return <Order2
        loading={loading} 
        order={order} 
        onFinish={onFinish} 
        onFinishFailed={onFinishFailed} 
        totalVacations={totalVacations} 
        totalText={totalText} 
        RangePicker={RangePicker}
        CountTotal={CountTotal}
        disabledDate={disabledDate}
        locale={locale}
        TextArea={TextArea}
        Upload={Upload}
        props={props}
        loadingApprover={loadingApprover}
        approver={approver}
      />
    }else{
      return <Order1 
        loading={loading} 
        order={order} 
        onFinish={onFinish} 
        onFinishFailed={onFinishFailed} 
        totalVacations={totalVacations} 
        totalText={totalText} 
        RangePicker={RangePicker}
        CountTotal={CountTotal}
        disabledDate={disabledDate}
        locale={locale}
        TextArea={TextArea}
        Upload={Upload}
        props={props}
        loadingApprover={loadingApprover}
        approver={approver}
        />
    }
  }

  return (
    <Row className="OrderPage-container" gutter={[12, 12]}>
      <Loading loading={active} />
      {orderRender()}
    </Row>
  );
};
export default OrderPage;
