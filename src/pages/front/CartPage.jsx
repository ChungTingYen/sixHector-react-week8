import { useEffect, useState, useCallback } from "react";
import { apiService } from "../../apiService/apiService";
import { Link } from "react-router-dom";
import {
  Carts,
  LoadingOverlay,
} from "../../component/front";
// import { useNavigatePage } from "../../hook";
const APIPath = import.meta.env.VITE_API_PATH;
import { useToast } from "../../hook";
export default function CartPage() {
  const [cart, setCart] = useState({});
  const [reload, setReload] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const updateToast = useToast();
  // const navigate = useNavigatePage();
  const handleDeleteCart = useCallback(async (cartId = null) => {
    //如果有cardId就是刪除一個，沒有就是刪除全部
    const path = `api/${APIPath}/cart` + (cartId ? `/${cartId}` : "s");
    setIsLoading(true);
    try {
      await apiService.axiosDelete(path);
      setReload(true);
      updateToast("刪除完成", "light", true);
    } catch (error) {
      console.log(error);
      alert(error);
      updateToast("刪除失敗", "light", true);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const getCart = async () => {
    try {
      const {
        data: { data, success, message },
      } = await apiService.axiosGet(`/api/${APIPath}/cart`);
      // console.log('data:',data);
      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (reload) {
      getCart();
      setReload(false);
    }
  }, [reload]);

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-md-10 d-flex d-flex align-items-center justify-content-between">
              <div className="fw-bold">訂購流程</div>
              <div>
                <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">購物車</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">建立訂單</span>
                  </li>
                  <li>
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">Lorem ipsum</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h3 className="mt-3 mb-4">購物車</h3>
            <div className="row">
              <div className="col-md-8">
                {cart.carts?.length > 0 ?
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 ps-0">
                      商品
                        </th>
                        <th scope="col" className="border-0">
                      數量
                        </th>
                        <th scope="col" className="border-0">
                      總價
                        </th>
                        <th scope="col" className="border-0">刪除</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.carts.map((cart) => (
                        <Carts
                          key={cart.id}
                          cart={cart}
                          handleDeleteCart={handleDeleteCart}
                          setIsLoading={setIsLoading}
                          setReload={setReload}
                        />
                      )) 
                      }
                    </tbody>
                  </table>
                  : <p>購物車沒有商品</p>}
                {cart.carts?.length > 0 &&
                <div className="d-flex">
                  <div className="input-group w-50 mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                      placeholder="Coupon Code"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                        type="button"
                        id="button-addon2"
                      >
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>

                  </div>
                  <div className="input-group w-50 mb-3">
                    <button
                      className="btn border-bottom border-top-0  btn-dark ms-auto"
                      type="button"
                      onClick={() => handleDeleteCart()}
                      disabled={cart.carts?.length <= 0}
                    >
                    刪除購物車
                    </button>
                  </div>
                </div>
                }
              </div>
              <div className="col-md-4">
                <div className="border p-4 mb-4">
                  <h4 className="fw-bold mb-4">訂單資訊</h4>
                  <table className="table text-muted border-bottom">
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          className="border-0 px-0 pt-4 font-weight-normal"
                        >
                        小計
                        </th>
                        <td className="text-end border-0 px-0 pt-4">NT${cart.total && cart.total.toLocaleString()}</td>
                      </tr>
                      {/* <tr>
                        <th
                          scope="row"
                          className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                        >
                        付款方式
                        </th>
                        <td className="text-end border-0 px-0 pt-0 pb-4">
                        ApplePay
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-between mt-4">
                    <p className="mb-0 h4 fw-bold">總價</p>
                    <p className="mb-0 h4 fw-bold">NT${cart.final_total && cart.final_total.toLocaleString()}</p>
                  </div>
                  {cart.carts?.length > 0 ? (
                    <Link to="/checkout-form" className="btn btn-dark w-100 mt-4">
                      前往結帳
                    </Link>
                  ) : (
                    <button className="btn btn-dark w-100 mt-4" disabled>
                      前往結帳
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="my-5">
              <h3 className="fw-bold">Lorem ipsum dolor sit amet</h3>
              <div className="swiper-container mt-4 mb-5">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="card border-0 mb-4 position-relative position-relative">
                      <img
                        src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                      <a href="#" className="text-dark"></a>
                      <div className="card-body p-0">
                        <h4 className="mb-0 mt-3">
                          <a href="#">Lorem ipsum</a>
                        </h4>
                        <p className="card-text mb-0">
                        NT$1,080
                          <span className="text-muted ">
                            <del>NT$1,200</del>
                          </span>
                        </p>
                        <p className="text-muted mt-3"></p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card border-0 mb-4 position-relative position-relative">
                      <img
                        src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                      <a href="#" className="text-dark"></a>
                      <div className="card-body p-0">
                        <h4 className="mb-0 mt-3">
                          <a href="#">Lorem ipsum</a>
                        </h4>
                        <p className="card-text mb-0">
                        NT$1,080
                          <span className="text-muted ">
                            <del>NT$1,200</del>
                          </span>
                        </p>
                        <p className="text-muted mt-3"></p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card border-0 mb-4 position-relative position-relative">
                      <img
                        src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                      <a href="#" className="text-dark"></a>
                      <div className="card-body p-0">
                        <h4 className="mb-0 mt-3">
                          <a href="#">Lorem ipsum</a>
                        </h4>
                        <p className="card-text mb-0">
                        NT$1,080
                          <span className="text-muted ">
                            <del>NT$1,200</del>
                          </span>
                        </p>
                        <p className="text-muted mt-3"></p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card border-0 mb-4 position-relative position-relative">
                      <img
                        src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                      <a href="#" className="text-dark"></a>
                      <div className="card-body p-0">
                        <h4 className="mb-0 mt-3">
                          <a href="#">Lorem ipsum</a>
                        </h4>
                        <p className="card-text mb-0">
                        NT$1,080
                          <span className="text-muted ">
                            <del>NT$1,200</del>
                          </span>
                        </p>
                        <p className="text-muted mt-3"></p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card border-0 mb-4 position-relative position-relative">
                      <img
                        src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                      <a href="#" className="text-dark"></a>
                      <div className="card-body p-0">
                        <h4 className="mb-0 mt-3">
                          <a href="#">Lorem ipsum</a>
                        </h4>
                        <p className="card-text mb-0">
                        NT$1,080
                          <span className="text-muted ">
                            <del>NT$1,200</del>
                          </span>
                        </p>
                        <p className="text-muted mt-3"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
