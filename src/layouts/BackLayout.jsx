import { NavLink, Outlet } from "react-router-dom";
import { useCheckLogin } from "../hook";
import { useEffect } from "react";
// import { WithLoginCheck } from '../component/back';
const routes = [
  { path: "/admin", name: "後台首頁" },
  { path: "/admin/productList", name: "產品後台列表" },
  { path: "/admin/orderList", name: "訂單列表" },
  { path: "/admin/couponList", name: "優惠券列表" },
  { path: "/", name: "前台首頁" },
];
export default function BackLayout() {
  const isLogin = useCheckLogin();
  useEffect(() => {
    const checkLoginStatus = async () => {
      await isLogin(); // 使用 await 來等待 isLogin 完成
    };
    checkLoginStatus();
  }, [isLogin]);//但不需要加上isLogin
  //測試HOC
  // const NavLinkWithCheck = WithLoginCheck(NavLink);
  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container">
          <ul className="navbar-nav flex-row gap-5 fs-5">
            {routes.map((route) => (
              <li key={route.path} className="nav-item">
                {/*//測試HOC
                <NavLinkWithCheck
                  className="nav-link"
                  aria-current="page"
                  to={route.path}
                >
                  {route.name}
                </NavLinkWithCheck> */}
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to={route.path}
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
