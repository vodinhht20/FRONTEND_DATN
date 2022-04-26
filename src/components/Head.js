import { Link } from "react-router-dom";
import logo from "../commons/images/logo.png";
const Head = () => {
    return (
        <div className="head">
            <Link to={"/"} className="logo"><img src={logo} /></Link>
        </div>
    )
}

export default Head;
