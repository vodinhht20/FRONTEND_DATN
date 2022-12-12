import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { initAccessToken } from "~/recoil/accessToken";

const CheckLogin = ({ children }) => {
  const accessToken = useRecoilValue(initAccessToken);
  if (accessToken) {
    return <Navigate to={'/'}/>
  }
  return children;
};

export default CheckLogin;
