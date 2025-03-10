import {  NavLink } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartSign } from "../../utils/utils";
export default function Header() {
  const routes = [
    // { path: "/", name: "首頁", id: "home" },
    { path: "/products", name: "產品列表", id: "products" },
    { path: "/cart", name: "購物車/訂購者資料", id: "cart" },
    { path: "/wishList", name: "心願清單", id: "wishList" },
    { path: "/cart", name: "購物車", id: "cartSign" },
    { path: "/orderList", name: "訂單清單", id: "orderList" },
    { path: "/loginBackend", name: "登入後台", id: "loginBackend" },
  ];
  const cartContent = useSelector((state) => state.cartAtStore);
  const dispatch = useDispatch();
  const [isToggle, setIsToggle] = useState(true);
  const handleToggleNavbar = () => {
    setIsToggle((prev) => !prev);
  };
  useEffect(() => {
    getCartSign(dispatch);
  }, [dispatch]);
  // 不使用原生的collapse就要用下方判斷，不然會有navbar消失的可能性
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsToggle(true); // 畫面拉大時強制展開
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container d-flex flex-column">
      <nav className="navbar navbar-expand-md navbar-light">
        <NavLink className="navbar-brand" to="/">
          首頁
        </NavLink>
        <button
          className="navbar-toggler "
          type="button"
          onClick={handleToggleNavbar}
          // 原本的collapse可以自動判斷畫面的大小然後顯示navbar，就可以搭配下面的屬性
          // data-bs-toggle={isToggle}
          // data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* 改用自訂的collapsible-content，原本的collapse好像無效 */}
        <div
          className={`collapsible-content navbar-collapse ${
            isToggle ? "show" : ""
          } justify-content-end  `}
          id="navbarNav"
        >
          <div className="navbar-nav">
            {routes.map((route) => (
              <Fragment key={route.id}>
                <NavLink
                  to={route.path}
                  className="nav-link fw-bold"
                  // aria-current="page"
                >
                  {route.name === "購物車" ? (
                    <div className="position-relative">
                      <i className="fas fa-shopping-cart"></i>
                      <span
                        className="position-absolute badge text-bg-success rounded-circle"
                        style={{
                          bottom: "12px",
                          left: "12px",
                        }}
                      >
                        {cartContent.carts?.length}
                      </span>
                    </div>
                  ) : (
                    route.name
                  )}
                </NavLink>
              </Fragment>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
