import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import { useState } from 'react';
export default function Header() {
  const routes = [
    { path: "/", name: "首頁" },
    { path: "/products", name: "產品列表" },
    { path: "/cart", name: "購物車/訂購者資料" },
    // { path: "/customerInfo", name: "訂購者資料" },
    { path: "/orderLists", name: "訂單清單" },
    { path: "/payment", name: "結帳" },
    { path: "/login", name: "登入後台" },
  ];
  const [toggle,setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((prev)=>!prev);
  };
  
  return (
    <div className="container d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-light">
        <NavLink to="/"></NavLink>
        <button
          className="navbar-toggler"
          type="button"
          // data-bs-toggle="collapse"
          // data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end ${toggle ? 'show' : ''}`}
        >
          <div className="navbar-nav">
            {routes.map((route) => (
              <Fragment key={route.path}>
                <NavLink
                  to={route.path}
                  className="nav-link fw-bold"
                  aria-current="page"
                >
                  {route.name}
                </NavLink>
              </Fragment>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
