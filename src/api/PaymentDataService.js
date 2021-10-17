import axios from "axios";
import Cookies from "universal-cookie/es6";

let cookies = new Cookies();

class PaymentDataService {

  createOrder = (data) => {
    return axios.post(`/${cookies.get("uId")}/order`,{ amount: data });
  };

  storeInfoServer=(data)=>{
    return axios.post(`/${cookies.get("uId")}/success`, data);
  }

  sendQuery=(form)=>{
    return axios.post(`/${cookies.get("uId")}/query`,form);
  }
}
 
export default new PaymentDataService();
