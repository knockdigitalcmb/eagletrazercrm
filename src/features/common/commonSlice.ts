import {
  CreateAsyncThunkFunction,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface commonDataState {
  authToken: string;
}

const initialState: commonDataState = {
  authToken: '',
};

export const commonDataSlice = createSlice({
  name: 'commonData',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<any>) => {
      state.authToken = action.payload;
    },
  },
});

export const commonData = (state: RootState) => state.commonData;

export const { setAuthToken } = commonDataSlice.actions;

export default commonDataSlice.reducer;
