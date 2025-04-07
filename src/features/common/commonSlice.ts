import {
  CreateAsyncThunkFunction,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface commonDataState {
  authToken: string;
  hasGoogleAccess:boolean;
}

const initialState: commonDataState = {
  authToken: '',
  hasGoogleAccess:false
};

export const commonDataSlice = createSlice({
  name: 'commonData',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<any>) => {
      state.authToken = action.payload;
    },
    setGoogleAccess:(state,action:PayloadAction<boolean>)=>{
        state.hasGoogleAccess=action.payload
    }
  },
});

export const commonData = (state: RootState) => state.commonData;

export const { setAuthToken, setGoogleAccess } = commonDataSlice.actions;

export default commonDataSlice.reducer;
