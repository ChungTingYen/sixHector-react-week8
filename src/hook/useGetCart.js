import { useDispatch } from "react-redux";
import { useCallback } from 'react';
import { apiService } from "../apiService/apiService";
const APIPath = import.meta.env.VITE_API_PATH;
function useGetCart(sliceMethod){
  const dispatch = useDispatch();
  const getCart = useCallback (async () => {
    try {
      const {
        data: { data },
      } = await apiService.axiosGet(`/api/${APIPath}/cart`);
      dispatch(sliceMethod(data));
    } catch (error) {
      console.log(error);
    } 
  },[dispatch,sliceMethod]);
  return getCart;
};
export default useGetCart;