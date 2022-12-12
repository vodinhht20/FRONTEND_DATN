import { reactLocalStorage } from "reactjs-localstorage";

const useRequestHeader = () => {
    let token = reactLocalStorage.get('access_token');
    let headers = {'Authorization': 'Bearer '+ token}
    return headers;
}

export default useRequestHeader;