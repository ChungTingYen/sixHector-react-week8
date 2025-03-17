import PropTypes from "prop-types";
import { memo } from "react";
const Coupons = (props) => {
  const {
    index,
    id,
    code,
    title,
    due_date,
    percent,
    is_enabled,
    handleDeleteModal,
    handleOpenEditModalWithValue,
  } = props;
  const atOpenEditMOdal = () => {
    handleOpenEditModalWithValue("edit", id);
  };
  const atOpenDeleteModal = () => {
    handleDeleteModal(id);
  };
  const setDue_date = (due_date) => {
    return new Date(due_date * 1000).toLocaleString("zh-TW", {
      hour12: false, // 使用 24 小時制
      year: "numeric", // 2 位數年份
      month: "2-digit", // 2 位數月份
      day: "2-digit", // 2 位數日期
      hour: "2-digit", // 2 位數小時
      minute: "2-digit", // 2 位數分鐘
    });
  };
  return (
    <>
      <tr>
        <th scope="row">{index} </th>
        <th scope="row">{id}</th>
        <td>{code}</td>
        <td>{title}</td>
        <td>{percent}%</td>
        <td>{setDue_date(due_date)}</td>
        <td>
          <span className={!is_enabled ? "text-danger fw-bold fs-4" : ""}>
            {is_enabled ? "是" : "否"}
          </span>
        </td>
        <td>
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-danger mx-1"
              onClick={atOpenEditMOdal}
            >
              編輯
            </button>
            <button
              type="button"
              className="btn btn-danger mx-1"
              onClick={atOpenDeleteModal}
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
Coupons.propTypes = {
  index:PropTypes.number,
  id:PropTypes.string,
  code:PropTypes.string,
  title:PropTypes.string,
  due_date:PropTypes.number,
  percent:PropTypes.number,
  is_enabled:PropTypes.number,
  handleDeleteModal:PropTypes.func,
  handleOpenEditModalWithValue:PropTypes.func,
};
export default memo(Coupons);
