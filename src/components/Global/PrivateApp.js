import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { initAccessToken } from "~/recoil/accessToken";

const PrivateApp = ({ children }) => {
  const accessToken = useRecoilValue(initAccessToken);
  if (accessToken == "") {
    return <Navigate to={'/login'}/>
  }
  return children;
};

export default PrivateApp;
