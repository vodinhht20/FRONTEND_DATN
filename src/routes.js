import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Checkin from "~/pages/Checkin";
import Timesheet from "~/pages/Timesheet";
import Home from "~/pages/Home";
import LayoutWebsite from "~/layouts/LayoutWebsite";
import More from "~/pages/More";
import Dashboard from "~/pages/Dashboard";
import CreateOrder from "~/pages/CreateOrder";
import Profile from "~/pages/Profile";
import { initProfile } from "~/recoil/profileAtom";
import { initLoad } from "~/recoil/loadAtom";
import { initCheckin } from "~/recoil/checkinAtom";
import { useSetRecoilState } from "recoil";
import moment from "moment";
import { getData, getDataV2 } from "~/api/BaseAPI";

const Router = () => {
  const setProfile = useSetRecoilState(initProfile);
  const setLoading = useSetRecoilState(initLoad);
  const setCheckin = useSetRecoilState(initCheckin);
  useEffect(() => {

    // call api profile
    // setProfile({
    //   email: "vodinh2000ht@gmail.com",
    //   fullname: "Võ Văn Định",
    //   birth_day: moment('2000-02-03', "YYYY-MM-DD"),
    //   avatar: "https://cdn.eva.vn/upload/4-2021/images/2021-10-29/new-project-550-1635505528-798-width800height700.jpg",
    //   gender: "2",
    //   phone: "+84329766459",
    //   TIN: "246134578 "
    // });
    getData('Profile')
      .then(({data}) => {
        setProfile(...data);

        // tạm thời để độ trễ 2s để test loading
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
      });
      getDataV2('checkin')
      .then(({data}) => {
        setCheckin(data[0]);
      })
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LayoutWebsite />}>
        <Route index element={<Home />} />
        <Route path="bang-cong" element={<Timesheet />} />
        <Route path="cham-cong" element={<Checkin />} />
        <Route path="thong-ke" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />

        {/* More router */}
        <Route path="more">
        <Route index element={<More />} />
          <Route path="create-order" element={<CreateOrder />} />
        </Route>
      </Route>
      <Route path="about" element={<h6>About</h6>} />
    </Routes>
  );
};

export default Router;
