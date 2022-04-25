import { Routes, Route } from "react-router-dom";
import Timekeep from "./components/websites/Timekeep";
import Timesheet from "./components/websites/Timesheet";
import Home from "./components/websites/Home";
import LayoutWebsite from "./layouts/LayoutWebsite";
import More from "./components/websites/More";
import Dashboard from "./components/websites/Dashboard";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWebsite />}>
        <Route index element={<Home />} />
        <Route path="bang-cong" element={<Timesheet />} />
        <Route path="cham-cong" element={<Timekeep />} />
        <Route path="thong-ke" element={<Dashboard />} />
        <Route path="more" element={<More />} />
      </Route>
      <Route path="about" element={<h6>About</h6>} />
    </Routes>
  );
};

export default Router;
