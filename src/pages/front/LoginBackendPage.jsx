import { useState, useEffect, useCallback } from "react";
import { useNavigatePage } from "../../hook";
// import { useLogin } from "../component/LoginContext";
import { apiService, apiServiceAdmin } from "../../apiService/apiService";
import { sweetalert, getHeadersFromCookie } from "../../utils/utils";
const LoginBackendPage = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigatePage("/admin");
  const changeInput = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };
  //登入
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.axiosPost("/admin/signin", account);
      if (res.data.success) {
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        sweetalert(res.data.message, "", "success", "確認");
        navigate();
      }
    } catch (error) {
      sweetalert(error, "", "error", "確認");
      console.log(error);
    }
  };
  const handleCheckLogin = useCallback( async () => {
    try {
      await apiServiceAdmin.axiosPost("/api/user/check", {});
      navigate();
    } catch (error) {
      console.log(error);
    }
  },[navigate]);
  useEffect(() => {
    if (getHeadersFromCookie().Authorization !== null) 
      handleCheckLogin();
  }, [handleCheckLogin]);
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">請先登入</h1>
        <form className="d-flex flex-column gap-3" onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="username"
              placeholder="name@example.com"
              name="username"
              onChange={changeInput}
              value={account.username}
            />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              onChange={changeInput}
              value={account.password}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary" type="submit">
            登入
          </button>
        </form>
        <p className="mt-5 mb-3 text-muted">&copy; 傲嬌廷的react練習</p>
      </div>
    </>
  );
};

export default LoginBackendPage;
