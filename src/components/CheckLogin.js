import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { initAccess_token } from "~/recoil/access_token";

const CheckLogin = ({ children }) => {
  const access_token = useRecoilValue(initAccess_token);
  if (access_token) {
    return <Navigate to={'/'}/>
  }
  return children;
};

export default CheckLogin;
