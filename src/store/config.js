import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { CRMAppDispatch, CRMRootState } from "./index";

export const useCRMAppDispatch = () => useDispatch(CRMAppDispatch)
export const useCRMAppSelector = () => useSelector(CRMRootState)