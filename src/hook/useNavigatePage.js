import { useNavigate } from "react-router-dom";
function useNavigatePage(defaultPath = '/'){
  const navigate = useNavigate();
  const gotoPage = (path)=>{
    path ? navigate(path) : navigate(defaultPath);
  };
  return gotoPage;
}

export default useNavigatePage ;