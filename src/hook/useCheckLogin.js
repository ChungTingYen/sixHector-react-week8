import { apiServiceAdmin } from "../apiService/apiService";
import { useNavigatePage } from '.';
import { useCallback } from "react";
export default  function useCheckLogin (){
  const navigate = useNavigatePage();
  const handleCheckLogin = useCallback( async () => {
    try {
      await apiServiceAdmin.axiosPost("/api/user/check",{});
    } catch (error) {
      console.log(error);
      navigate('/loginBackend');
    }
  },[navigate]);
  return handleCheckLogin;
}
