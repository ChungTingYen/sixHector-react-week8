import { useDispatch } from "react-redux";
import { setIsShowToastSlice, } from "../slice/toastSlice";
import { useCallback } from "react";
const useToast = ()=>{
  const dispatch = useDispatch();
  const updateToastInfo = useCallback( (text,type,isShowToast)=>{
    dispatch(setIsShowToastSlice({
      text: text,
      type:type,
      isShowToast: isShowToast,
    }));
  },[dispatch,]);

  return updateToastInfo;
};
export default useToast;