import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({ children }: any) => {
  const token = useSelector((state: RootState) => state.commonData.authToken);
  let location = useLocation();
  // if (token) {
  //   return <Navigate to='/' state={{ from: location }} replace />;
  // } else {
  //   return children;
  // }
  return children;
};
export default ProtectedRoute;
