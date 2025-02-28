import {
  CreateAsyncThunkFunction,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface commonDataState {
  authToken: any;
}

const initialState: commonDataState = {
  authToken: '',
};

export const commonDataSlice = createSlice({
  name: 'commonData',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<commonDataState>) => {
      state.authToken = action.payload;
    },
    setClearAuthToken:((state)=>{
       state.authToken = null;
    })
  },
});

export const commonData = (state: RootState) => state.commonData;

export const { setAuthToken,setClearAuthToken } = commonDataSlice.actions;

export default commonDataSlice.reducer;
