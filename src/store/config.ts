import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './index';

export const useCRMAppDispatch = () => useDispatch<AppDispatch>();
export const useCRMAppSelector: TypedUseSelectorHook<RootState> = useSelector;
