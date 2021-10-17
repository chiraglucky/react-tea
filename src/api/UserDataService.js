import axios from "axios";

class UserDataService {
  registration = (data) => {
    return axios.post(`/registration`, data);
  };

  login = (data) => {
    return axios.post(`/login`, data);
  };

  getCollection=()=>{
    return axios.get(`/teas/collections`).then(response=>response.data);
  }

  getTeasByCollection=(name)=>{
    return axios.get(`/teas/collections/${name}`);
  }
}

export default new UserDataService();
