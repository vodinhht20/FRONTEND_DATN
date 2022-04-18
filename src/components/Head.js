import { Link } from "react-router-dom";
import logo from "../commons/images/logo.png";
const Head = () => {
    return (
        <div className="head">
            <Link to={"/"} className="logo"><img src={"https://caodang.fpt.edu.vn/wp-content/uploads/logo-3.png"} /></Link>
        </div>
    )
}

export default Head;