import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute=()=>{
  const token=useSelector((state:RootState)=>state.commonData.authToken)
  return token.length>0 ? <Outlet/>:<Navigate to='/' replace/>
}
export default ProtectedRoute;