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
  // user search filter action
  static searchUserList = async (payload: any) => {
    try {
      // const response = await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/searchUserList`,
      //   method: 'POST',
      // data:payload
      // });
      // return response?.data;
      return true;
    } catch (error) {
      console.log('search user list', error);
    }
  };

  // get user list action
  static getUserList = async () => {
    try {
      const rows = [
        {
          id: 1,
          employeeId: 'E001',
          userName: 'Test User',
          role: 'Admin',
          phoneNumber: '1234567890',
          email: 'test@gmail.com',
          location: 'Tamil Nadu',
          address: 'Test Address',
          status: 'active',
          dateOfJoining: '2005-04-18',
        },
        {
          id: 2,
          employeeId: 'E002',
          userName: 'John Doe',
          role: 'Developer',
          phoneNumber: '9876543210',
          email: 'johndoe@gmail.com',
          location: 'Chennai',
          address: '123 Street',
          status: 'inactive',
          dateOfJoining: '2018-05-14',
        },
        {
          id: 3,
          employeeId: 'E003',
          userName: 'Jane Smith',
          role: 'Lead',
          phoneNumber: '1112223333',
          email: 'janesmith@gmail.com',
          location: 'Bangalore',
          address: 'XYZ Avenue',
          status: 'active',
          dateOfJoining: '2022-02-11',
        },
      ];
      // const response = await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/userlist`,
      //   method: 'GET',
      // });
      // return response?.data;
      return rows;
    } catch (error) {
      console.log('get the user list api', error);
    }
  };
}
