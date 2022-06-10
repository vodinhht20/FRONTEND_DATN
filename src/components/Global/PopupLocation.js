import { Button, Card } from "antd";
import "~/assets/css/poppup.css";

const PopupLocation = ({ locationpopup }) => {
  return (
    <div className={`poppup ${locationpopup}`}>
          <Card className="poppup-content" title="Cần quyền truy cập vị trí" style={{textAlign: 'center'}}>
            <span className="text-info">
              <p>Vui lòng cho phép trang web truy cập vị trí của bạn</p>
              <Button type="primary" onClick={() => window.location.href = "https://support.google.com/chrome/answer/142065"}>
                Cho phép
              </Button>
            </span>
          </Card>
    </div>
  );
};

export default PopupLocation;
