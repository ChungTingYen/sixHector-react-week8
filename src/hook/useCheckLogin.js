import { useEffect } from "react";
import { apiServiceAdmin } from "../apiService/apiService";
// import { useNavigatePage } from '.';
export default  function useCheckLogin (){
//   const navigate = useNavigatePage();
  const handleCheckLogin = async () => {
    console.log('BackLayout,handleCheckLogin');
    try {
      await apiServiceAdmin.axiosPost("/api/user/check",{});
      return null;
    } catch (error) {
      console.log(error);
      //   return navigate('/loginBackEnd');
      return 'error';
    }
  };
  useEffect(()=>{
    handleCheckLogin();
  },[]);
}
