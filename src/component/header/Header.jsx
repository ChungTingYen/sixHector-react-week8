import { NavLink } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartSign } from '../../utils/utils';
export default function Header() {
  const routes = [
    { path: "/", name: "首頁" ,id:'home' },
    { path: "/products", name: "產品列表" ,id:'products' },
    { path: "/cart", name: "購物車/訂購者資料" ,id:'cart' },
    { path: "/wishList", name: "心願清單" ,id:'wishList' },
    { path: "/cart", name: "購物車" ,id:'cartSign' },
    { path: "/orderList", name: "訂單清單" ,id:'orderList' },
    { path: "/loginBackend", name: "登入後台" ,id:'loginBackend' },
  ];
  const cartContent = useSelector(state=>state.cartAtStore);
  const dispatch = useDispatch();
  useEffect(()=>{
    getCartSign(dispatch);
  },[dispatch]);
  return (
    <div className="container d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div
          className='navbar-collapse justify-content-end '
        >
          <div className="navbar-nav">
            {routes.map((route) => (
              <Fragment key={route.id}>
                <NavLink
                  to={route.path}
                  className="nav-link fw-bold"
                  aria-current="page"
                >
                  {route.name === '購物車' ?
                    <div className="position-relative">
                      <i className="fas fa-shopping-cart"></i>
                      <span
                        className="position-absolute badge text-bg-success rounded-circle"
                        style={{
                          bottom: "12px",
                          left: "12px",
                        }}
                      >{cartContent.carts?.length}</span>
                    </div>
                    : route.name
                  }
                </NavLink>
              </Fragment>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
