import { useDispatch } from "react-redux";
import { setIsShowflashModalSlice } from '../slice/flashModalSlice';
import { useCallback } from "react";
const useFlashModal = ()=>{
  const dispatch = useDispatch();
  const updateFlashModal = useCallback((text,isShowFlashModal)=>{
    dispatch(setIsShowflashModalSlice({
      flashModalInfo:{
        text: text,
        isShowFlashModal: isShowFlashModal,
      }
    }));
  },[dispatch]);
  return updateFlashModal;
};
export default useFlashModal;