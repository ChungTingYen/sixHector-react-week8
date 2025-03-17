
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WithLoginCheck = (Component)=>{
  return function CheckIsloginOnNavLink(props){
    const navigate = useNavigate();
    const isLogin = useSelector(state=>state.loginAtStore.isLogin);
    console.log('WithLoginCheck');
    console.log('isLogin:',isLogin);
    const handleClick = (e)=>{
      console.log('WithLoginCheck');
      if(!isLogin){
        e.preventDefault();
        console.log('loginBackend');
        navigate('/loginBackend');
      }
    };
    return <Component {...props} onClick={handleClick}/>;
  };
};

export default WithLoginCheck;