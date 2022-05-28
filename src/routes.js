import { Routes, Route } from "react-router-dom";
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
import { useSetRecoilState } from "recoil";
import { initProfile, initLoad, initCheckin, initDataChart, initListOrder, initRankCheckin, initHomeStatistic, initAccessToken } from "~/recoil/atom";
import { getData } from "~/api/BaseAPI";
import { notification } from "antd";
import { rankListData, homeStatisticData, checkinData } from "~/data-test";
import LoginFake from "./pages/LoginFake";
import CheckLogin from "./components/Global/CheckLogin";
import PrivateApp from "./components/Global/PrivateApp";
import NotFound from "./pages/NotFound";
import { reactLocalStorage } from "reactjs-localstorage";

const Router = () => {
  const setAccessToken = useSetRecoilState(initAccessToken);
  const setProfile = useSetRecoilState(initProfile);
  const setLoading = useSetRecoilState(initLoad);
  const setCheckin = useSetRecoilState(initCheckin);
  const setDataChart = useSetRecoilState(initDataChart);
  const setlistOrder = useSetRecoilState(initListOrder);
  const setRankCheckin = useSetRecoilState(initRankCheckin);
  const setHomeStatistic = useSetRecoilState(initHomeStatistic);
  useEffect(() => {
    setAccessToken(reactLocalStorage.get('access_token'));
    (async () => {
      try {

        let orderData = await getData("list-don");
        setlistOrder(orderData.data);

        let dashboardData = await getData("dashboard");
        setDataChart(dashboardData.data);

        let profileData = await getData("Profile");
        setProfile(...profileData.data);

        setCheckin(checkinData);

        setRankCheckin(rankListData);

        setHomeStatistic(homeStatisticData);

        // when all call api success then set loading is false
        setLoading(false);
      } catch (error) {
        console.log("Đã có lỗi xảy ra:", error);
        if (error.code == 'access_token_expired') {
          notification['info']({
            message: 'Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại'
          });
          setAccessToken("");
          reactLocalStorage.clear();
        } else {
          setLoading(true);
          notification['error']({
            message: 'Đã có lỗi xảy ra',
            description: <>message: {error.message}<br/>code: {error.code}<br/></>
          });
          throw error;
        }
      }
    })()
  }, []);

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

        {/* More router */}
        <Route path="more">
          <Route index element={<More />} />
          <Route path="create-order" element={<CreateOrderLayout />} >
            <Route index element={<CreateOrder />} />
            <Route path="tao-don" element={<OrderPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="about" element={<h6>About</h6>} />
    </Routes>
  );
};

export default Router;
