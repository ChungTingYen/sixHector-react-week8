import { createSlice } from "@reduxjs/toolkit";
export const loginSlice = createSlice({
  name:'loginSlice',
  initialState:
  { isLogin:false },
  reducers:{
    // updateCartSlice(state,action){
    //   const { carts,total,final_total } = action.payload;
    //   state.carts = carts;
    //   state.total = total;
    //   state.final_total = final_total;
    // },
  }
});

// export const { }  = loginSlice.actions;
export default loginSlice.reducer;
//測試的loginSlice