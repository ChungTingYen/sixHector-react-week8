import { useEffect, useState, useCallback } from "react";
import { apiService } from "../../apiService/apiService";
import { Link } from "react-router-dom";
import { Carts, LoadingOverlay } from "../../component/front";
import { clearCartSlice } from "../../slice/cartSlice";
const APIPath = import.meta.env.VITE_API_PATH;
import { getCartSign } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { useToast } from "../../hook";
export default function CartPage() {
  const [cart, setCart] = useState({});
  const [reload, setReload] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const updateToast = useToast();
  const dispatch = useDispatch();
  const handleDeleteCart = useCallback(async (cartId = null) => {
    //如果有cardId就是刪除一個，沒有就是刪除全部
    const path = `api/${APIPath}/cart` + (cartId ? `/${cartId}` : "s");
    setIsLoading(true);
    try {
      await apiService.axiosDelete(path);
      setReload(true);
      updateToast("刪除完成", "light", true);
      cartId === null ? dispatch(clearCartSlice()) : getCartSign(dispatch);
    } catch (error) {
      console.log(error);
      alert(error);
      updateToast("刪除失敗", "light", true);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch,updateToast]);
  const getCart = async () => {
    try {
      const {
        data: { data, },
      } = await apiService.axiosGet(`/api/${APIPath}/cart`);
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
                    <span className="text-nowrap ms-1">收件人資料</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">建立訂單</span>
                  </li>
                  <li>
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">結帳</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <h3 className="fw-bold mb-4 pt-3">購物車</h3>
            </div>
          </div>
          <div className="row flex-row justify-content-center pb-5">
            <div className="col-md-6">
              {cart.carts?.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border-0 ps-0"
                        style={{ width: "40%" }}
                      >
                        商品
                      </th>
                      <th
                        scope="col"
                        className="border-0"
                        style={{ width: "45%" }}
                      >
                        數量
                      </th>
                      <th
                        scope="col"
                        className="border-0"
                        style={{ width: "10%" }}
                      >
                        總價
                      </th>
                      <th
                        scope="col"
                        className="border-0"
                        style={{ width: "10%" }}
                      >
                        刪除
                      </th>
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
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-danger fw-bold">購物車沒有商品</p>
              )}
              {cart.carts?.length > 0 && (
                <div className="d-flex">
                  <div className="input-group w-50 mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                      placeholder="不給你用折扣碼"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      disabled={true}
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
              )}
              <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                <Link to="/products" className="text-dark mt-md-0 mt-3 fw-bold">
                  <i className="fas fa-chevron-left me-2"></i>
                  回到產品頁
                </Link>
                {cart.carts?.length > 0 ? (
                  <Link to="/checkout" className="btn btn-dark py-3 px-5">
                    填寫收件人資訊
                  </Link>
                ) : (
                  <button className="btn btn-dark py-3 px-5" disabled>
                    填寫收件人資訊
                  </button>
                )}
              </div>
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
                      <td className="text-end border-0 px-0 pt-4">
                        NT${cart.total && cart.total.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">總價</p>
                  <p className="mb-0 h4 fw-bold">
                    NT$
                    {cart.final_total && cart.final_total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
