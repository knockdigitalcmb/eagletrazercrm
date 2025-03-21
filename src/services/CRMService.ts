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
  // create user role list
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

  // delete user role list
  static deleteUserRole = async (payload: any) => {
    try {
      // const response = await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/deleteUserRole`,
      //   method: 'POST',
      // data:payload
      // });
      // return response?.data;
      return true;
    } catch (error) {
      console.log('delete user role api', error);
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
          otpPage: 1,
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
          otpPage: 0,
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

  static updateUser = async (payload: any) => {
    try {
      const response = await commonServiceAPI.CRMAPICall({
        url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/updateUser`,
        method: 'POST',
        data: payload,
      });

      return true;
    } catch (error) {
      console.log('error in update api:', error);
    }
  };
  static createUser = async (payload: any) => {
    try {
      const response = await commonServiceAPI.CRMAPICall({
        url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/createuser`,
        method: 'POST',
        data: payload,
      });

      return true;
    } catch (error) {
      console.log('error create user api:', error);
    }
  };

  static getSearchUserList = async (payload: any) => {
    try {
      const response = await commonServiceAPI.CRMAPICall({
        url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/searchUser`,
        method: 'POST',
        data: payload,
      });

      return true;
    } catch (error) {
      console.log('search user list api:', error);
    }
  };

  static deleteUser = async (payload: any) => {
    try {
      // const response = await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}wqBPlJJqwnPmxINapM/api/v1/deleteUser`,
      //   method: 'DELETE',
      //   data:payload
      // });

      return true;
    } catch (error) {
      console.error('error in delete user api:', error);
    }
  };

  //leads

  static leadsList = async () => {
    const rows = [
      {
        id: 1,
        date: '1-2-2002',
        customerName: 'Gopal',
        phoneNumber: '123456789',
        email: 'gopal@gmail.com',
        location: 'cbe',
        follower: 'Vaishali',
        leadSource: 'Reference',
        nextDate: '12-2-2002',
      },
      {
        id: 2,
        date: '5-6-2023',
        customerName: 'Ravi',
        phoneNumber: '987654321',
        email: 'ravi@example.com',
        location: 'chennai',
        follower: 'Arun',
        leadSource: 'Direct Call',
        nextDate: '10-6-2023',
      },
    ];
    try {
      // const response = await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}wqBPlJJqwnPmxINapM/api/v1/leadlist`,
      //   method: 'GET',
      // });
      return rows;
    } catch (error) {
      console.log('Leads Errors:', error);
    }
  };

  //Leads Search

  static searchLeads = async (payload: any) => {
    try {
      // const response = await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}wqBPlJJqwnPmxINapM/api/v1/searchLeads`,
      //   method: 'POST',
      //   data: payload,
      // });
      // return respond?.data
      return true;
    } catch (error) {
      console.log('search Leads:', error);
    }
  };

  //Leads filter

  static leadsFilterList  = async (payload: any) => {
    try {
      // const response = await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/leadsFilter`,
      //   method: 'POST',
      //   data:payload
      // });
      // return response?.data;
      return true;
    } catch (error) {
      console.log('filter list', error);
    }
  };

  //lead source
  static leadSourceList = async () => {
    const rows = [
      { id: 1, name: 'Google Ads', status: { active: true, inactive: false } },
      { id: 2, name: 'Facebook', status: { active: false, inactive: true } },
      { id: 3, name: 'Referral', status: { active: true, inactive: false } },
      { id: 4, name: 'DirectCall', status: { active: false, inactive: true } },
    ];
    try {
      // const response=await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/searchLeadSourceList`,
      //   method:"GET"
      // })
      return rows;
    } catch (error) {
      console.log('Lead Source error', error);
    }
  };
  //lead source search
  static searchLeadSourceList = async (payload: any) => {
    try {
      // const response = await commonServiceAPI.CRMAPICall({
      //   url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/searchLeadSourceList`,
      //   method: 'POST',
      //   data: payload,
      // });
      // return response?.data;

      return true;
    } catch (error) {
      console.log('search lead source list api:', error);
    }
  };
  // Create Lead Source API
static createLeadSource = async (payload: { name: string; status: string }) => {
  try {
    const response = await commonServiceAPI.CRMAPICall({
      url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/createLeadSource`,
      method: 'POST',
      data: payload,
    });
    return response?.data;
  } catch (error) {
    console.error('Create Lead Source API error:', error);
  }
};

// Update Lead Source API
static updateLeadSource = async (id: number, payload: { name: string; status: string }) => {
  try {
    const response = await commonServiceAPI.CRMAPICall({
      url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/updateLeadSource/${id}`,
      method: 'PUT',
      data: payload,
    });
    return response?.data;
  } catch (error) {
    console.error('Update Lead Source API error:', error);
  }
};
// Delete Lead Source API
static deleteLeadSource = async (id: number) => {
  try {
    const response = await commonServiceAPI.CRMAPICall({
      url: `${API_DOMAIN}/wqBPlJJqwnPmxINapM/api/v1/deleteLeadSource/${id}`,
      method: 'DELETE',
    });
    return response?.data;
  } catch (error) {
    console.error('Delete Lead Source API error:', error);
  }
};


}
