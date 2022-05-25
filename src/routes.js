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
import { initProfile, initLoad, initCheckin, initDataChart, initListOrder, initRankCheckin, initHomeStatistic } from "~/recoil/atom";
import { getData } from "~/api/BaseAPI";
import { notification } from "antd";
import { rankListData, homeStatisticData, checkinData } from "~/data-test";
import LoginFake from "./pages/LoginFake";

const Router = () => {
  const setProfile = useSetRecoilState(initProfile);
  const setLoading = useSetRecoilState(initLoad);
  const setCheckin = useSetRecoilState(initCheckin);
  const setDataChart = useSetRecoilState(initDataChart);
  const setlistOrder = useSetRecoilState(initListOrder);
  const setRankCheckin = useSetRecoilState(initRankCheckin);
  const setHomeStatistic = useSetRecoilState(initHomeStatistic);
  useEffect(() => {
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
        setLoading(true);
        notification['error']({
          message: 'Đã có lỗi xảy ra',
          description: <>message: {error.message}<br/>code: {error.code}<br/></>
        });
        throw error;
      }
    })()
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />}/>
      <Route path="/" element={<LayoutWebsite />}>
        <Route index element={<Home />} />
        <Route path="bang-cong" element={<Timesheet />} />
        <Route path="cham-cong" element={<Checkin />} />
        <Route path="thong-ke" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<LoginFake />} />

        {/* More router */}
        <Route path="more">
          <Route index element={<More />} />
          <Route path="create-order" element={<CreateOrderLayout />} >
            <Route index element={<CreateOrder />} />
            <Route path="tao-don" element={<OrderPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="about" element={<h6>About</h6>} />
    </Routes>
  );
};

export default Router;
