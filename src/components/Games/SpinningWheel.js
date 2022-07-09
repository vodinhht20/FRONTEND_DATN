import { Button, Card, Col, message, PageHeader, Row } from "antd";
import { useState } from "react";
import WheelComponent from "react-wheel-of-prizes";
import { useRecoilValue } from "recoil";
import { getData2 } from "~/api/BaseAPI";
import { initLoad } from "~/recoil/load";

const SpinningWheel = () => {
  const loading = useRecoilValue(initLoad);
  const [spin, setSpin] = useState(null);
  const segments = [
    "Áo thun",
    "Gấu bông cute",
    "500K tiền mặt",
    "10K tiền mặt",
    "1K tiền mặt",
    "50K tiền mặt",
    "Chúc bạn may mắn lần sau",
  ];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];
  const onFinished = (winner) => {
    message.success(winner);
  };
  const playGame = () => {
    getData2('spinning-game')
    .then(({ data }) =>  setSpin(data.spin))
    .catch((error) => message.error('Lỗi'))
  }
  console.log(spin);
  return (
    <div className="wr-container game">
      <Button onClick={playGame} >CLick</Button>
      <PageHeader ghost={false} title="Spinning Wheel Games" />
      <Row className="game-container" gutter={[12, 12]}>
        <Col xs={24} md={24} lg={24}>
          <Card onClick={playGame} bordered={false} loading={loading}>
            <WheelComponent
              segments={segments}
              segColors={segColors}
              onClick={
                getData2('spinning-game')
                .then(({ data }) =>  setSpin(data.spin))
                .catch((error) => message.error('Lỗi'))
              }
              winningSegment={spin}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="#F37220"
              contrastColor="white"
              buttonText="Camel Spin"
              isOnlyOnce={false}
              size={290}
              upDuration={500}
              downDuration={300}
              fontFamily="Arial"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SpinningWheel;
