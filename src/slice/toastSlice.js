import { createSlice } from "@reduxjs/toolkit";
import { toastSliceDefaultValue } from '../data/defaultValue';
export const toastSlice = createSlice({
  name:'toastSlice',
  initialState:
    toastSliceDefaultValue
  ,
  reducers:{
    setIsShowToastSlice(state,action){
      const { text,type } = action.payload;
      const id = Date.now();
      state.toastInfo.push({ id,text,type });
    },
    removeMessage(state,action){
      const messageId = action.payload;
      const index = state.toastInfo.findIndex((message)=>message.id === messageId);
      if(index !== -1){
        state.toastInfo.splice(index,1);
      }
    }
    //之前單一toast的寫法
    // console.log('setIsShowToast,state.toastInfo:',state.toastInfo.isShowToast);
    // console.log('setIsShowToast, state.toastInfo:', JSON.stringify(state.toastInfo));
    // state.toastInfo = {
    //   ...state.toastInfo,
    //   ...action.payload.toastInfo
    // };
    // console.log('action.payload:',action.payload);
  }
});

export const { setIsShowToastSlice,removeMessage }  = toastSlice.actions;
export default toastSlice.reducer;
