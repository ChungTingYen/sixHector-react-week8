/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { apiServiceAdmin } from "../../apiService/apiService";
import * as utils from '../../utils/utils';
const AppFunction = (props) => {
  const { setIsLogin } = props;
  const navigate = useNavigate();
  //檢查登入狀態
  const handleCheckLogin = async () => {
    try {
      const headers = utils.getHeadersFromCookie();
      const res = await apiServiceAdmin.axiosPostCheckSingin(
        "/api/user/check",
        headers
      );
      alert(res.data.success ? "已登入成功" : "請重新登入");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      const res = await apiServiceAdmin.axiosPost('logout');
      alert(res.data.success ? res.data.message : "登出失敗");
      if (res.data.success) {
        setIsLogin(false);
        navigate('/login');
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  // const handleLogout = async () => {
  //   try {
  //     const res = await apiServiceAdmin.axiosPostLogout("/logout");
  //     alert(res.data.success ? res.data.message : "登出失敗");
  //     if (res.data.success) {
  //       document.cookie = "authToken; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  //       setIsLogin(false);
  //       navigate('/login');
  //     }
  //   } catch (error) {
  //     alert(error);
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <div className="row mt-5 mt-1 mb-2 mx-1">
        <div className="d-flex">
          <h3>檢查功能</h3>
          <button
            type="button"
            className="btn btn-warning mx-1"
            onClick={handleCheckLogin}
          >
            檢查登入狀態
          </button>
          <button
            type="button"
            className="btn btn-warning mx-1"
            onClick={handleLogout}
          >
            登出
          </button>
        </div>
      </div>
    </>
  );
};

export default AppFunction;
