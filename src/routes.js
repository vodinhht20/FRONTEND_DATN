import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "~/pages/Login"
import Checkin from "~/pages/Checkin";
import Timesheet from "~/pages/Timesheet";
import Home from "~/pages/Home";
import LayoutWebsite from "~/layouts/LayoutWebsite";
import More from "~/pages/More";
import Dashboard from "~/pages/Dashboard";
import CreateOrder from "~/pages/CreateOrder";
import Profile from "~/pages/Profile";
import CreateOrderLayout from "./layouts/CreateOrderLayout";
import OrderPage from "./pages/OrderPage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { initProfile, initLoad, initCheckin, initDataChart, initListOrder, initRankCheckin, initHomeStatistic, initAccessToken, initBanner, initCheckKyc, initSettingDefault, initNotification, initOT, initBLog } from "~/recoil/atom";
import { checkAuth, getData, getData2, getNotification, timekeepRanking } from "~/api/BaseAPI";
import { message, notification } from "antd";
import { homeStatisticData, checkinData } from "~/data-test";
import LoginFake from "./pages/LoginFake";
import GiaoDienDonTu from "./pages/GiaoDienDonTu/GiaoDienDonTu";
import HoSoNhanSu from "./pages/HoSoNhanSu/HoSoNhanSu";
import CheckLogin from "./components/Global/CheckLogin";
import PrivateApp from "./components/Global/PrivateApp";
import NotFound from "./pages/NotFound";
import { reactLocalStorage } from "reactjs-localstorage";
import { initRoutesLogin } from "./recoil/routesLogin";
import moment from "moment";
import { initLocation } from "./recoil/location";
import { initLoadLocationPopup } from "./recoil/loadLocationPopup";
import GoogleMap from "./pages/GoogleMap";
import Blog from "./pages/Blog";
import SpinningWheel from "./components/Games/SpinningWheel";
import firebase from '~/firebase';
import { tokenFirebase } from "~/api/BaseAPI";

const Router = () => {
  const setAccessToken = useSetRecoilState(initAccessToken);
  const setProfile = useSetRecoilState(initProfile);
  const setLoading = useSetRecoilState(initLoad);
  const setCheckin = useSetRecoilState(initCheckin);
  const setDataChart = useSetRecoilState(initDataChart);
  const setlistOrder = useSetRecoilState(initListOrder);
  const setRankCheckin = useSetRecoilState(initRankCheckin);
  const setHomeStatistic = useSetRecoilState(initHomeStatistic);
  const setLocation = useSetRecoilState(initLocation);
  const setLoadingLocation = useSetRecoilState(initLoadLocationPopup);
  const setBanner = useSetRecoilState(initBanner);
  const setCheckKyc = useSetRecoilState(initCheckKyc);
  const settingDefault = useSetRecoilState(initSettingDefault);
  const setNotification = useSetRecoilState(initNotification);
  const setOt = useSetRecoilState(initOT);
  const setBlog = useSetRecoilState(initBLog);

  const routesLogin = useRecoilValue(initRoutesLogin);
  useEffect(() => {
    setAccessToken(reactLocalStorage.get('access_token'));
    const setting = reactLocalStorage.get('backgroundColor');
    setting &&
    settingDefault({
      'backgroundHead': JSON.parse(setting).backgroundHead,
      'backgroundBottom': JSON.parse(setting).backgroundBottom,
    });

    checkAuth().then(() => {
      (async () => {
          let notifications = await getNotification();
          setNotification(notifications.data.data);

          let banner = await getData2("banner");
          setBanner(banner.data);

          let checkkyc = await getData2("kyc-check");
          setCheckKyc(checkkyc.data.status);

          let orderData = await getData2("list-single-type");
          setlistOrder(orderData.data.payload);

          let dashboardData = await getData2("dashboard");
          setDataChart(dashboardData.data.data);

          let profileData = await getData2("profile");
          setProfile({...profileData.data, avatar: profileData.data.avatar ? profileData.data.avatar : null, birth_day: moment(profileData.data.birth_day ? profileData.data.birth_day : '0000-00-00', "YYYY-MM-DD")});

          let otPersonal = await getData2("timesheet");
          setOt((otPersonal?.data?.ot?.ot) / 60 || 0);

          let checkinData = await getData2('checkin/data-checkin');
          setCheckin(checkinData.data.data);

          let rankData = await timekeepRanking();
          setRankCheckin(rankData.data.data);

          let blogData = await getData2("blog");
          setBlog(blogData.data.data);

          setHomeStatistic(homeStatisticData);

          // when all call api success then set loading is false
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({"latitude": position.coords.latitude, "longitude": position.coords.longitude})
            },
            (error) => {
              message.warning(`Vui lòng cho phép trang web truy cập vị trí của bạn - ${error.code} - ${error.message}`)
              setLoadingLocation('active');
            },
          )

          // init fire base
          const messaging = firebase.messaging();
          messaging.requestPermission().then(function () {
            return messaging.getToken()
          }).then(function(token) {
            tokenFirebase({ token }).then(({data})=>{
                  console.log(data)
            }).catch(({response:{data}})=>{
                console.error(data)
            })
          }).catch(function (err) {
              console.log(`Token Error :: ${err}`);
          });

          setLoading(false);
      })()
    })
    .catch((error) => {
      console.log("Đã có lỗi xảy ra:", error.response.data.message);
          if (error.response.data.error_code == 71) {
            notification['info']({
              message: 'Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại'
            });
            setAccessToken("");
            reactLocalStorage.clear();
          } else if(error.response.data.error_code == 70){
            setAccessToken("");
            reactLocalStorage.clear();
          }
          else {
            setLoading(true);
            notification['error']({
              message: 'Đã có lỗi xảy ra',
              description: <>message: {error.message}<br/>code: {error.code}<br/></>
            });
            throw error;
          }
    })
  }, [routesLogin]);

  return (
    <Routes>
        <Route path="login" element={<CheckLogin><Login /></CheckLogin>}/>
      <Route path="/" element={<PrivateApp><LayoutWebsite /></PrivateApp>}>
        <Route index element={<Home />} />
        <Route path="bang-cong" element={<Timesheet />} />
        <Route path="cham-cong" element={<Checkin />} />
        <Route path="thong-ke" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="loginfake" element={<LoginFake />} />
        <Route path="blog/:slug" element={< Blog/>} />

        {/* More router */}
        <Route path="more">
          <Route index element={<More />} />
          <Route path="hosonhansu" element={< HoSoNhanSu/>} />
          <Route path="game-spinning-wheel" element={<SpinningWheel />} />
          <Route path="map" element={<GoogleMap />} />
          <Route path="don-tu-cua-ban" element={< GiaoDienDonTu/>} />
          <Route path="create-order" element={<CreateOrderLayout />} >
            <Route index element={<CreateOrder />} />
            <Route path="tao-don/:id" element={<OrderPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="about" element={<h6>About</h6>} />
    </Routes>
  );
};

export default Router;
