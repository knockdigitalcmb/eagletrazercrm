import { CreateAsyncThunkFunction, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../store';

interface commonDataState {
    data: any
}

const initialState: commonDataState = {
    data: []
}

export const commonDataSlice = createSlice({
    name: 'commonData',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<commonDataState>) => {
            state.data = action.payload
        }
    }
})

export const commonData = (state: RootState) => state.commonData;

export const { setData } = commonDataSlice.actions;

export default commonDataSlice.reducer