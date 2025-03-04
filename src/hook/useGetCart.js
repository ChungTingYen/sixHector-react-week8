import { useDispatch } from "react-redux";
import { apiService } from "../apiService/apiService";
const APIPath = import.meta.env.VITE_API_PATH;
function useGetCart(sliceMethod){
  const dispatch = useDispatch();
  const getCart = async () => {
    try {
      const {
        data: { data, success, message },
      } = await apiService.axiosGet(`/api/${APIPath}/cart`);
      dispatch(sliceMethod(data));
    } catch (error) {
      console.log(error);
    } 
  };
  return getCart;
};
export default useGetCart;