import { commonServiceAPI } from './API';

export class CRMServiceAPI {
  //Login API
  static userLogin = async (payload: any) => {
    try {
      const response = await commonServiceAPI.CRMAPICall({
        url: 'https://jsonplaceholder.typicode.com/comments?postId=1',
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
        url: 'https://jsonplaceholder.typicode.com/comments?postId=1',
        method: 'POST',
        data: payload,
      });
      return response?.data;
    } catch (error) {
      console.log('otp verification', error);
    }
  };
  
}
