import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
            status: 'not-authenticated',
            user: {},    
            errorMessage:null,
    },
    reducers: {
        login: (state, {payload} ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },

        logout: (state, {payload} ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    login, 
    logout,
    } = authSlice.actions;