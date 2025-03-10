import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
function useNavigatePage(defaultPath = '/'){
  const navigate = useNavigate();
  const gotoPage = useCallback( (path)=>{
    path ? navigate(path) : navigate(defaultPath);
  },[defaultPath,navigate]);
  return gotoPage;
}

export default useNavigatePage ;