import React from 'react';
import { Route, Routes } from 'react-router';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import OTPPage from '../pages/Otp';
import Dashboard from '../pages/Dashboard';
import CreateUser from '../pages/CreateUser';
import User from '../pages/User';

const _Routes = () => {
  return (
    <Routes>
      <Route key='login' path='/' element={<Login />} />
      <Route key='page404' path='*' element={<Page404 />} />
      <Route key='otp' path='/otp' element={<OTPPage />} />
      <Route key='dashboard' path='/dashboard' element={<Dashboard />} />
      <Route key='user' path='/user' element={<User />} />
      <Route path='/create-user' element={<CreateUser />} />
    </Routes>
  );
};

export default _Routes;
