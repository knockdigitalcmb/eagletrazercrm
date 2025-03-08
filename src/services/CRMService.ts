import { commonServiceAPI } from './API';

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;
export class CRMServiceAPI {
  //Login API
  static userLogin = async (payload: any) => {
    try {
      const response = await commonServiceAPI.CRMAPICall({
        url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/login`,
        method: 'POST',
        data: payload,
      });
      return response?.data;
    } catch (error) {
      console.log('user login api', error);
    }
  };

  //Otp Verification API
  static OTPVerification = async (payload: any) => {
    try {
      const response = await commonServiceAPI.CRMAPICall({
        url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/login-otp`,
        method: 'POST',
        data: payload,
      });
      return response?.data;
    } catch (error) {
      console.log('otp verification', error);
    }
  };
  static RoleData= async () => {
    try {
      const response = await commonServiceAPI.CRMAPICall({
        url: `https://jsonplaceholder.typicode.com/posts/1`,
        method: 'GET',
      });
      return response?.data;
    } catch (error) {
      console.log('Role Data api', error);
    }
  };
}
