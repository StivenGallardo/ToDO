import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {

        loading: false,
    },
    reducers: {
        onLoading : (state, {payload}) => {
            state.loading = payload;
        }

    }
});


// Action creators are generated for each case reducer function
export const { 
    onLoading
} = uiSlice.actions;