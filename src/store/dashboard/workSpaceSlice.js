import { createSlice } from '@reduxjs/toolkit';

export const workSpaceSlice = createSlice({
     name: 'workSpace',
     initialState: {
          workSpaces : [],
          activeWorkSpace : null,
          selectedWorkSpace: null,
          workSpaceLists: [],


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
          },

          onWorkSpaceLists: (state, {payload}) => {
               state.workSpaceLists = payload;
          },

          onUpdateWorkSpaceLists: (state, action) => {
               state.workSpaceLists = action.payload;
          },

          onDeleteWorkSpaceList: (state, {payload}) => {
               state.workSpaceLists = state.workSpaceLists.filter(list => list.id !== payload);
          }
     }
});


// Action creators are generated for each case reducer function
export const { 
     onSetActiveWorkSpace,
     onAddNewWorkSpace,
     onSetWorkSpace,
     onSelectedWorkSpace,
     onWorkSpaceLists,
     onUpdateWorkSpaceLists,
     onDeleteWorkSpaceList,
} = workSpaceSlice.actions;