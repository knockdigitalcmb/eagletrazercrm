import React from 'react';
import { Route, Routes } from 'react-router';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import OTPPage from '../pages/Otp';
import Dashboard from '../pages/Dashboard';
import CreateUser from '../pages/CreateUser';
import User from '../pages/User';
import Roles from '../pages/Roles/index';
import Leads from '../pages/Leads/index';
import LeadSource from '../pages/LeadSource';
import LeadStatus from '../pages/LeadStatus';
import ProtectedRoute from './ProtectedRoute';

const _Routes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route key='page404' path='*' element={<Page404 />} />
      <Route
        path='/otp'
        key='otp'
        element={
          <ProtectedRoute>
            <OTPPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/dashboard'
        key='dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/user'
        key='user'
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path='/create-user'
        key='create-user'
        element={
          <ProtectedRoute>
            <CreateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path='/roles'
        key='roles'
        element={
          <ProtectedRoute>
            <Roles />
          </ProtectedRoute>
        }
      />
      <Route
        path='/leads'
        key='leads'
        element={
          <ProtectedRoute>
            <Leads />
          </ProtectedRoute>
        }
      />
      <Route
        path='/lead-source'
        key='lead-source'
        element={
          <ProtectedRoute>
            <LeadSource />
          </ProtectedRoute>
        }
      />
      <Route
        path='/lead-status'
        key='lead-status'
        element={
          <ProtectedRoute>
            <LeadStatus />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default _Routes;
