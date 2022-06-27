import { Navigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { useRecoilValue } from "recoil";
import { initAccessToken } from "~/recoil/accessToken";

const PrivateApp = ({ children }) => {
  const accessToken = useRecoilValue(initAccessToken);
  const token = reactLocalStorage.get('access_token');
  if (accessToken == "" && !token) {
    return <Navigate to={'/login'}/>
  }
  return children;
};

export default PrivateApp;
