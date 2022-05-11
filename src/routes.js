import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Checkin from "./components/websites/Checkin";
import Timesheet from "./components/websites/Timesheet";
import Home from "./components/websites/Home";
import LayoutWebsite from "./layouts/LayoutWebsite";
import More from "./components/websites/More";
import Dashboard from "./components/websites/Dashboard";
import CreateOrder from "./components/websites/CreateOrder";
import Profile from "./components/websites/Profile";
import { initProfile } from "./recoil/profileAtom";
import { initLoad } from "./recoil/loadAtom";
import { useSetRecoilState } from "recoil";
import moment from "moment";
import { getData } from "./api/BaseAPI";

const Router = () => {
  const setProfile = useSetRecoilState(initProfile);
  const setLoading = useSetRecoilState(initLoad);
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
        setLoading(false);
      });
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
