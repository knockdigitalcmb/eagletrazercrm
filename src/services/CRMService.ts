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

  //get user role list
  static getUserRoleList = async () => {
    const rows = [
      {
        id: 1,
        role: 'Admin',
        permission: { create: true, edit: true, view: true, delete: true },
      },
      {
        id: 2,
        role: 'User',
        permission: { create: false, edit: true, view: true, delete: false },
      },
    ];
    try {
      // const response = await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/getuserList`,
      //   method: 'GET',
      // });
      return rows;
    } catch (error) {
      console.log('get user list api', error);
    }
  };

  //update user role list
  static updateUserRole = async (payload: any) => {
    try {
      // const response = await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/updateUserRole`,
      //   method: 'POST',
      // data:payload
      // });
      // return response?.data;
      return true;
    } catch (error) {
      console.log('update user role api', error);
    }
  };

  static createUserRole = async (payload: any) => {
    try {
      // const response = await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/createUserRole`,
      //   method: 'POST',
      // data:payload
      // });
      // return response?.data;
      return true;
    } catch (error) {
      console.log('create user role api', error);
    }
  };
}
