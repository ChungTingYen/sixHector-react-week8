import { createSlice } from "@reduxjs/toolkit";
// import { flashModalDefaultValue } from '../data/defaultValue';
const wishListSlice = createSlice({
  name:'wishList',
  initialState:{},
  reducers:{
    getWishList(state,){
      const wishListStorage = JSON.parse(localStorage.getItem('wishList')) || {};
      //   console.log('wishListStorage:',wishListStorage);
      return { ...state,...wishListStorage };
    }
  } 
});
export const { getWishList } = wishListSlice.actions;
export default wishListSlice.reducer;