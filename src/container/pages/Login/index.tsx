import React, { useEffect } from "react";
import { CRMServiceAPI } from "../../../services/CRMService";
import { setData } from '../../../features/common/commonSlice';
import { useCRMAppDispatch } from "../../../store/config";
import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useCRMAppDispatch()
  useEffect(() => {
    getAPI();
  }, [])

  const getAPI = async () => {
    let res = await CRMServiceAPI.getUserList();
    dispatch(setData(res))
  }
  return <p>Welcome to Knock Digital CRM page</p>
}

export default Login