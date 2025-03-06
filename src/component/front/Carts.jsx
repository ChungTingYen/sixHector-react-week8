/* eslint-disable react/prop-types */
import { apiService } from "../../apiService/apiService";
const APIPath = import.meta.env.VITE_API_PATH;
import { useDispatch } from "react-redux";
import { setIsShowToastSlice } from "../../slice/toastSlice";
// import { updateCartSlice } from "../../slice/cartSlice";
// import {  useGetCart } from "../../hook";
const Carts = (props) => {
  const { cart, handleDeleteCart, setIsLoading, setReload } = props;
  const dispatch = useDispatch();
  // const updateCartSign = useGetCart(updateCartSlice);
  const handleIncreDecreProduct = async (cartId, type) => {
    setIsLoading(true);
    try {
      const putData = {
        data: {
          product_id: cart.product.id,
          qty: type === "+" ? cart.qty + 1 : cart.qty - 1,
        },
      };
      await apiService.axiosPut(`/api/${APIPath}/cart/${cartId}`, putData);
      setReload(true);
      dispatch(
        setIsShowToastSlice({
          type: "warning",
          text: `${type === "+" ? "增加商品數量完成" : "減少商品數量完成"}`,
          isShowToast: true,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setIsShowToastSlice({
          toastInfo: {
            type: "warning",
            text: "數量變更失敗",
            isShowToast: true,
          },
        })
      );
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className="border-bottom border-top">
      <th scope="row" className="border-0 px-0 font-weight-normal py-4" >
        <div className="d-flex flex-column">
          <p className="mb-0 fw-bold  d-inline-block">{cart.product.title}</p>
          <img
            src={cart.product.imageUrl}
            alt={cart.product.title}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
            }}
          />
        </div>
      </th>
      <td className="border-0 align-middle" style={{ maxWidth: "120px" }}>
        <div className="input-group">
          <div className="input-group-prepend">
            <button
              className={`btn btn-outline-dark border-0 ${
                cart.qty <= 1 ? "bg-secondary" : ""
              }`}
              disabled={cart.qty <= 1 && true}
              type="button"
              id="button-addon1"
              onClick={() => handleIncreDecreProduct(cart.id, "-")}
            >
              <i className="fas fa-minus"></i>
            </button>
          </div>
          <div className="input-group-append">
            <span
              className="form-control border-0 text-center my-auto shadow-none"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            >
              {cart.qty}
            </span>
          </div>
          <div className="input-group-append">
            <button
              className="btn btn-outline-dark border-0"
              type="button"
              id="button-addon2"
              onClick={() => handleIncreDecreProduct(cart.id, "+")}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </td>
      <td className="border-0 align-middle">
        <p className="mb-0 ms-auto">NT${cart.total.toLocaleString()}</p>
      </td>
      <td className="border-0 align-middle">
        <button
          className="btn btn-outline-dark border-0"
          type="button"
          id="button-addon2"
          onClick={() => handleDeleteCart(cart.id)}
        >
          <i className="fas fa-times"></i>
        </button>
      </td>
    </tr>
  );
};
export default Carts;
