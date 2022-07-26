import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Typography from '@mui/material/Typography';
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper";
import { Avatar, Tooltip, Button, Modal, Input, List, Tag } from "antd";
import { GiftOutlined, UserOutlined } from "@ant-design/icons";
import { CardActionArea, CardActions } from '@mui/material';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CarMUI from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { SkeletonCard } from "~/components/Home";
import VirtualList from 'rc-virtual-list';

import bannerBirthDay from "~/assets/images/banner/happy_birth_day.png";
import { happyBirthday, birtday } from "~/components/images";
import { Link } from "react-router-dom";

const SliderEvent = ({ loading, blog, birthDay }) => {

const { TextArea } = Input;
const [isModalVisible, setIsModalVisible] = useState(false);
const [visible, setVisible] = useState(false);
const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};
const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

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
        {
           loading ?
           <SwiperSlide>
                <SkeletonCard />
            </SwiperSlide>
            :
            birthDay.length > 0 && (
                <SwiperSlide>
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
                                            {
                                                birthDay.map((item) => {
                                                    return <Tooltip title={item.fullname} placement="top">
                                                                <Avatar src={item.avatar} />
                                                            </Tooltip>
                                                })
                                            }
                                            </Avatar.Group>
                                        </div>
                                    </div>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button type="primary" onClick={showModal} className="btn-section-event  btn-section-warring">
                                Xem ngay
                            </Button>
                            <Modal title="Danh sách sinh nhật" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className="modal-happy-birthday">
                                <img src={ happyBirthday } style={{ position: "absolute", width: "90%", top: 0, zIndex: 10 }}/>
                                <VirtualList
                                    data={birthDay}
                                    height={350}
                                    itemHeight={47}
                                    itemKey="email"
                                    style={{ paddingTop: "54px" }}
                                >
                                    {item => (
                                        <List.Item key={item.id} className="user-item">
                                            <div class="age-birthday">
                                                <img className="img-birtday" src={ birtday }/>
                                                <Tag style={{margin: "0"}}color="cyan">{ item.age } Tuổi</Tag>
                                            </div>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item?.avatar} size="large"/>}
                                                title={<a href={item?.avatar}>{item?.fullname || 'Vô Danh'}</a>}
                                                description={item?.position?.name || ''}
                                                className="user-info"
                                            />
                                        </List.Item>
                                    )}
                                </VirtualList>
                            </Modal>
                        </CardActions>
                    </CarMUI>
                </SwiperSlide>
            )
        }

        {loading ?
            <>
                <SwiperSlide>
                    <SkeletonCard />
                </SwiperSlide>
                <SwiperSlide>
                    <SkeletonCard />
                </SwiperSlide>
                <SwiperSlide>
                    <SkeletonCard />
                </SwiperSlide>
            </>
            :
            blog && blog.map((item) => {
                return (
                    <SwiperSlide>
                            <CarMUI >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={process.env.REACT_APP_LINK_SERVER+item?.images}
                                        alt="banner"
                                    />
                                    <CardContent className="box-card-content-event">
                                        <Typography variant="body2" color="text.secondary">
                                            <div className="content-event">{item?.title}</div>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                        <Button type="primary" className="btn-section-event  btn-section-warring">
                                            <Link to={`/blog/${item?.slug}`} >
                                                Đọc ngay
                                            </Link>
                                        </Button>
                                </CardActions>
                            </CarMUI>
                    </SwiperSlide>
                )
            })
        }

        {/* <SwiperSlide>
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
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
export default SliderEvent;
