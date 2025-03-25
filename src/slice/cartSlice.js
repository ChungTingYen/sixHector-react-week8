import { createSlice } from "@reduxjs/toolkit";
import { cartDefaultValue } from '../data/defaultValue';
export const cartSlice = createSlice({
  name:'cartSlice',
  initialState:
  cartDefaultValue,
  reducers:{
    updateCartSlice(state,action){
      const { carts,total,final_total } = action.payload;
      return {
        ...state,carts,total,final_total
      };
      //等義
      // state.carts = carts;
      // state.total = total;
      // state.final_total = final_total;
    },
    clearCartSlice(state){
      Object.assign(state, cartDefaultValue); 
    }
  }
});

export const { clearCartSlice,updateCartSlice }  = cartSlice.actions;
export default cartSlice.reducer;
