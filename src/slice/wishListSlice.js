import { createSlice } from "@reduxjs/toolkit";
const wishListSlice = createSlice({
  name:'wishList',
  initialState:{},
  reducers:{
    getWishList(state,){
      const wishListStorage = JSON.parse(localStorage.getItem('wishList')) || {};
      return { ...wishListStorage };
    },
  } 
});
export const { getWishList,setWishList } = wishListSlice.actions;
export default wishListSlice.reducer;