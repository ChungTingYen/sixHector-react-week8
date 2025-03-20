import PropTypes from "prop-types";
import { useEffect, useState, useRef, memo } from "react";
import { Modal } from "bootstrap";
import { apiServiceAdmin } from "../../apiService/apiService";
const APIPath = import.meta.env.VITE_API_PATH;
import { tempCouponDefaultValue } from "../../data/defaultValue";
import { useToast, useFlashModal } from "../../hook";
const CouponEditModal = (props) => {
  const {
    editData,
    setModalMode,
    modalMode,
    getData,
    isEditModalOpen,
    setIsEditModalOpen,
  } = props;
  const updateToast = useToast();
  const updateFlashModal = useFlashModal();
  const [modalCoupon, setModalCoupon] = useState(editData);
  const editModalDivRef = useRef(null);

  const closeEditModal = () => {
    setModalMode(null);
    setModalCoupon(tempCouponDefaultValue);
    const modalInstance = Modal.getInstance(editModalDivRef.current);
    modalInstance.hide();
    setIsEditModalOpen(false);
  };
  const openEditModal = () => {
    const modalInstance = Modal.getInstance(editModalDivRef.current);
    modalInstance.show();
  };

  const handleEditDataChange = (e) => {
    const { name, type, value, checked } = e.target;
    let tempValue;
    if (type === "number") tempValue = Number(value);
    else if (type === "checkbox") tempValue = checked;
    else if (type === "date") tempValue = new Date(value).getTime() / 1000;
    else tempValue = value;
    const temp = {
      ...modalCoupon,
      [name]: tempValue,
    };
    setModalCoupon(temp);
  };
  const implementEditProduct = async (type, modalCoupon) => {
    try {
      const wrapData = {
        data: {
          ...modalCoupon,
          is_enabled: modalCoupon.is_enabled ? 1 : 0,
        },
      };
      let path = "";
      switch (type) {
      case "create":
        path = `/api/${APIPath}/admin/coupon`;
        await apiServiceAdmin.axiosPostAddProduct(path, wrapData);
        break;
      case "edit":
        path = `/api/${APIPath}/admin/coupon/${modalCoupon.id}`;
        await apiServiceAdmin.axiosPutProduct(path, wrapData);
        break;
      default:
        break;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const handleUpdateProduct = async () => {
    if (!modalCoupon.id && modalMode === "edit") {
      alert("未取得coupon ID");
      return;
    }
    updateFlashModal("loading", true);
    try {
      const result = await implementEditProduct(modalMode, modalCoupon);
      if (result) {
        closeEditModal();
        getData();
        setModalCoupon(tempCouponDefaultValue);
        updateToast(
          modalMode === "create" ? "新增完成" : "更新完成",
          "warning",
          true
        );
      } else {
        // alert(modalMode === "create" ? "新增失敗:" : "更新失敗:");
      }
    } catch (error) {
      console.log(error);
    } finally {
      updateFlashModal("closing", false);
    }
  };
  const setDue_date = (due_date) => {
    const date = new Date(due_date * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // 返回 YYYY-MM-DDTHH:mm
  };
  useEffect(() => {
    if (editModalDivRef.current) {
      new Modal(editModalDivRef.current, { backdrop: false });
    }
  }, []);
  useEffect(() => {
    if (isEditModalOpen) {
      Object.keys(editData).length > 0 ? setModalCoupon(editData) : setModalCoupon(tempCouponDefaultValue);
      openEditModal();
    }
  }, [isEditModalOpen,editData]);

  return (
    <>
      <div
        id="productModal"
        className="modal fade"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        ref={editModalDivRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              <h5 className="modal-title fs-4">{modalCoupon.title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeEditModal}
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body p-4">
              <div className="row g-4">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      名稱
                    </label>
                    <input
                      name="title"
                      id="title"
                      type="text"
                      className="form-control"
                      placeholder="請輸入名稱"
                      value={modalCoupon.title}
                      onChange={handleEditDataChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="code" className="form-label">
                    代碼
                    </label>
                    <input
                      name="code"
                      id="code"
                      type="text"
                      className="form-control"
                      placeholder="請輸入代碼"
                      value={modalCoupon.code}
                      onChange={handleEditDataChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="percent" className="form-label">
                      折扣
                    </label>
                    <input
                      name="percent"
                      id="percent"
                      type="number"
                      className="form-control"
                      placeholder="請輸入折扣"
                      min={0}
                      value={modalCoupon.percent}
                      onChange={handleEditDataChange}
                    />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label htmlFor="due_date" className="form-label">
                        到期日
                      </label>
                      <input
                        name="due_date"
                        id="due_date"
                        type="date"
                        className="form-control"
                        placeholder="請輸入到期日"
                        value={modalCoupon.due_date ? setDue_date(modalCoupon.due_date) : ""} // 時間戳記轉換
                        onChange={handleEditDataChange}
                      />
                    </div>
                  </div> 
                  <div className="form-check">
                    <input
                      name="is_enabled"
                      type="checkbox"
                      className="form-check-input"
                      id="isEnabled"
                      checked={modalCoupon.is_enabled}
                      onChange={handleEditDataChange}
                    />
                    <label className="form-check-label" htmlFor="isEnabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-top bg-light">
              <button
                type="button"
                className="btn btn-secondary"
                aria-label="Close"
                onClick={closeEditModal}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateProduct}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
CouponEditModal.propTypes = {
  editData:PropTypes.object,
  setModalMode:PropTypes.func,
  modalMode:PropTypes.string,
  getData:PropTypes.func,
  isEditModalOpen:PropTypes.bool,
  setIsEditModalOpen:PropTypes.func,
};
export default memo(CouponEditModal);
