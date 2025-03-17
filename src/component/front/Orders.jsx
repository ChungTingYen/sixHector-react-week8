import PropTypes from "prop-types";
import { memo } from "react";
const Orders = (props) => {
  const { id, total, is_paid, handleOpenOrderModalWithValue, } = props;
  const atOpenOrderMOdal = () => {
    handleOpenOrderModalWithValue("view", id);
  };
  return (
    <>
      <tr>
        <th scope="row">{id}</th>
        <td>
          <span className={!is_paid ? "text-danger fw-bold fs-4" : ""}>
            {is_paid ? "已付款" : "未付款"}
          </span>
        </td>
        <td>NT${total.toLocaleString()}</td>
        <td>
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-warning mx-1"
              onClick={atOpenOrderMOdal}
            >
            結帳
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
Orders.propTypes = {
  id:PropTypes.string, 
  total:PropTypes.number,
  is_paid:PropTypes.bool,
  handleOpenOrderModalWithValue:PropTypes.func
};
export default memo(Orders);
