import { Routes, Route } from "react-router-dom";
import Donhang from "./components/websites/Donhang";
import Home from "./components/websites/Home";
import LayoutWebsite from "./layouts/LayoutWebsite";

const Router = () => {
    return(
        <Routes>
        <Route path="/" element={<LayoutWebsite />}>
            <Route index element={<Home />}/>
            <Route path="diemdanh" element={<h1>Điểm danh</h1>}/>
            <Route path="thongke" element={<h1>Thống kê</h1>}/>
            <Route path="donhang" element={<Donhang />}/>
        </Route>
        <Route path="about" element={<h6>About</h6>} />
      </Routes>
    )
}

export default Router;