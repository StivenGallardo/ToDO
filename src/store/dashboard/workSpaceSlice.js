import { createSlice } from '@reduxjs/toolkit';

export const workSpaceSlice = createSlice({
     name: 'workSpace',
     initialState: {
          workSpaces : [],
          activeWorkSpace : null,
          selectedWorkSpace: null,


     },
     reducers: {
          onSetActiveWorkSpace: (state, {payload}) => {
               state.activeWorkSpace = payload
          },

          onAddNewWorkSpace: (state, {payload}) => {
               state.workSpaces.push(payload);
               state.activeWorkSpace = null;
          },

          onSetWorkSpace: (state, {payload}) => {
               state.workSpaces = payload;
          },


          onSelectedWorkSpace: (state, {payload}) => {
               state.selectedWorkSpace = payload;
          }
     }
});


// Action creators are generated for each case reducer function
export const { 
     onSetActiveWorkSpace, 
     onAddNewWorkSpace, 
     onSetWorkSpace, 
     onSelectedWorkSpace, 
} = workSpaceSlice.actions;