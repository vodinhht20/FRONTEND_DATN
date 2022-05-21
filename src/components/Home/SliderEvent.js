import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Typography from '@mui/material/Typography';
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper";
import { Avatar, Card, Tooltip, Button } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import { CardActionArea, CardActions } from '@mui/material';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CarMUI from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { SkeletonCard } from "~/components/Home";

import bannerBirthDay from "~/assets/images/banner/happy_birth_day.png";
import bannerVaccine from "~/assets/images/banner/banner-vaccine.png";
import bannerMeet from "~/assets/images/banner/banner_meet.png";

const SliderEvent = ({ loading }) => {
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => setWidthScreen(window.innerWidth));
    }, []);
  return (
    <>
      <Swiper
        slidesPerView={widthScreen < 992 ? (widthScreen < 600 ? 1 : 2) : 3}
        spaceBetween={30}
        freeMode={true}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
        pagination={{
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="dot-circle ' + className + '">' + (index + 1) + "</span>";
            },
        }}
        modules={[FreeMode, Pagination , Navigation, Autoplay]}
        className="box-home-event"
      >
        <SwiperSlide>
            {
                loading ?
                <SkeletonCard />
                :
                <CarMUI >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="160"
                            image={bannerBirthDay}
                            alt="banner"
                        />
                        <CardContent className="box-card-content-event">
                            <Typography variant="body2" color="text.secondary">
                                <div className="content-event">
                                <div className="title-event"><GiftOutlined className="section-icon"/> <b>6 đồng nghiệp </b>sinh nhật hôm nay</div>
                                <div className="list-avatar">
                                    <Avatar.Group
                                        maxCount={4}
                                        maxPopoverTrigger="click"
                                        size="large"
                                        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                                        >
                                        <Tooltip title="Võ Định" placement="top">
                                            <Avatar style={{ backgroundColor: '#f56a00' }}>VĐ</Avatar>
                                        </Tooltip>
                                        <Tooltip title="Trần Tiến" placement="top">
                                            <Avatar style={{ backgroundColor: '#3aa9ee' }}>TT</Avatar>
                                        </Tooltip>
                                        <Tooltip title="Trọng Anh" placement="top">
                                            <Avatar style={{ backgroundColor: '#269e26' }}>TA</Avatar>
                                        </Tooltip>
                                        <Tooltip title="Huy Hoàng" placement="top">
                                            <Avatar style={{ backgroundColor: '#1890ff' }}>HH</Avatar>
                                        </Tooltip>
                                        <Tooltip title="Lê Vân" placement="top">
                                            <Avatar style={{ backgroundColor: '##f3c20e' }}>LV</Avatar>
                                        </Tooltip>
                                        </Avatar.Group>
                                    </div>
                                </div>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button type="primary" className="btn-section-event  btn-section-warring">
                            Gửi lời chúc
                        </Button>
                    </CardActions>
                </CarMUI>
            }
        </SwiperSlide>
        <SwiperSlide>
            {
                loading ?
                <SkeletonCard />
                :
                <CarMUI >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="160"
                            image={bannerVaccine}
                            alt="banner"
                        />
                        <CardContent className="box-card-content-event">
                            <Typography variant="body2" color="text.secondary">
                                <div className="content-event">
                                    Nếu dữ liệu chưa cập nhật mới nhất, bạn vui lòng cập nhật thêm các mũi tiêm của mình,
                                    kèm theo minh chứng là ảnh chụp của <b>"Giấy chứng nhận tiêm vaccine"</b>.
                                </div>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button type="primary" className="btn-section-event  btn-section-warring">
                            Cập nhật ngay
                        </Button>
                    </CardActions>
                </CarMUI>
            }
        </SwiperSlide>
        <SwiperSlide>
            {
                loading ?
                <SkeletonCard />
                :
                <CarMUI >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="160"
                            image={bannerMeet}
                            alt="banner"
                        />
                        <CardContent className="box-card-content-event">
                            <Typography variant="body2" color="text.secondary">
                            <div className="content-event">
                                <div className="title-event">Đào tạo quy trình làm việc cho thành viên mới</div>
                                <div>
                                    <p>Thời gian: <b> 9H30 - 11H00</b> | <b>05/08/2022</b></p>
                                    <p>Link meet: <b className="text-info"><a href='https://meet.google.com/kij-oceq-iti'>https://meet.google.com/kij-oceq-iti</a></ b></p>
                                </div>
                            </div>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button type="primary" className="btn-section-event  btn-section-warring">
                            Tham gia
                        </Button>
                    </CardActions>
                </CarMUI>
            }
        </SwiperSlide>
        <SwiperSlide>
            {
                loading ?
                <SkeletonCard />
                :
                <CarMUI >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="160"
                            image={bannerBirthDay}
                            alt="banner"
                        />
                        <CardContent className="box-card-content-event">
                            <Typography variant="body2" color="text.secondary">
                            <div className="content-event">
                            <div className="title-event"><GiftOutlined className="section-icon"/> <b>6 đồng nghiệp </b>sinh nhật hôm nay</div>
                            <div className="list-avatar">
                                <Avatar.Group
                                    maxCount={4}
                                    maxPopoverTrigger="click"
                                    size="large"
                                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                                    >
                                    <Tooltip title="Võ Định" placement="top">
                                        <Avatar style={{ backgroundColor: '#f56a00' }}>VĐ</Avatar>
                                    </Tooltip>
                                    <Tooltip title="Trần Tiến" placement="top">
                                        <Avatar style={{ backgroundColor: '#3aa9ee' }}>TT</Avatar>
                                    </Tooltip>
                                    <Tooltip title="Trọng Anh" placement="top">
                                        <Avatar style={{ backgroundColor: '#269e26' }}>TA</Avatar>
                                    </Tooltip>
                                    <Tooltip title="Huy Hoàng" placement="top">
                                        <Avatar style={{ backgroundColor: '#1890ff' }}>HH</Avatar>
                                    </Tooltip>
                                    <Tooltip title="Lê Vân" placement="top">
                                        <Avatar style={{ backgroundColor: '##f3c20e' }}>LV</Avatar>
                                    </Tooltip>
                                    </Avatar.Group>
                                </div>
                            </div>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button type="primary" className="btn-section-event  btn-section-warring">
                            Gửi lời chúc
                        </Button>
                    </CardActions>
                </CarMUI>
            }
        </SwiperSlide>
        <SwiperSlide>
            {
                loading ?
                <SkeletonCard />
                :
                <CarMUI >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="160"
                            image={bannerVaccine}
                            alt="banner"
                        />
                        <CardContent className="box-card-content-event">
                            <Typography variant="body2" color="text.secondary">
                                <div className="content-event">
                                    Nếu dữ liệu chưa cập nhật mới nhất, bạn vui lòng cập nhật thêm các mũi tiêm của mình,
                                    kèm theo minh chứng là ảnh chụp của <b>"Giấy chứng nhận tiêm vaccine"</b>.
                                </div>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button type="primary" className="btn-section-event  btn-section-warring">
                            Cập nhật ngay
                        </Button>
                    </CardActions>
                </CarMUI>
            }
        </SwiperSlide>
        <SwiperSlide>
            {
                loading ?
                <SkeletonCard />
                :
                <CarMUI >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="160"
                            image={bannerMeet}
                            alt="banner"
                        />
                        <CardContent className="box-card-content-event">
                            <Typography variant="body2" color="text.secondary">
                            <div className="content-event">
                                <div className="title-event">Đào tạo quy trình làm việc cho thành viên mới</div>
                                <div>
                                    <p>Thời gian: <b> 9H30 - 11H00</b> | <b>05/08/2022</b></p>
                                    <p>Link meet: <b className="text-info"><a href='https://meet.google.com/kij-oceq-iti'>https://meet.google.com/kij-oceq-iti</a></ b></p>
                                </div>
                            </div>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button type="primary" className="btn-section-event  btn-section-warring">
                            Tham gia
                        </Button>
                    </CardActions>
                </CarMUI>
            }
        </SwiperSlide>
      </Swiper>
    </>
  );
}
export default SliderEvent;
