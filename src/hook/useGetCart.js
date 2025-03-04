import { useDispatch } from "react-redux";
import { updateCartSlice } from '../slice/cartSlice';
import { apiService } from "../apiService/apiService";
import { useEffect } from "react";
const APIPath = import.meta.env.VITE_API_PATH;
function useGetCart(){

  const dispatch = useDispatch();
  const getCart = async () => {
    try {
      const {
        data: { data, success, message },
      } = await apiService.axiosGet(`/api/${APIPath}/cart`);
      console.log('data:',data);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    } 
  };
  const empty = ()=>{
    
  };
  useEffect(()=>{
    const fetchCart = async()=>{
      const cartData = await getCart();
      console.log('cartData:',cartData);
      if(cartData)
        dispatch(updateCartSlice(cartData));
    };
    fetchCart();
  },[dispatch]);
  return getCart;
};
export default useGetCart;