import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Card, Result, Spin } from "antd";
import { Link } from "react-router-dom";
import "~/assets/css/poppup.css";

const Popup = (props) => {
  return (
    <div className={`poppup active`}>
          <Card className="poppup-content" title="Thông Báo" style={{textAlign: 'center'}}>
          <Result
            status={props.icon ? props.icon : 'info'}
            title={props.content}
            extra={
              <Link to={'/'} >
                <Button type="primary">
                  Về trang chủ
                </Button>
              </Link>
            }
          />
          </Card>
    </div>
  );
};

export default Popup;
