import { apiServiceAdmin } from "../apiService/apiService";
import { useNavigatePage } from '.';
export default  function useCheckLogin (){
  const navigate = useNavigatePage();
  const handleCheckLogin = async () => {
    try {
      await apiServiceAdmin.axiosPost("/api/user/check",{});
    } catch (error) {
      console.log(error);
      navigate('/loginBackend');
    }
  };
  return handleCheckLogin;
}
