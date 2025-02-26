/* eslint-disable react/prop-types */
import { useRef, useEffect, useState, Fragment } from "react";
import ReactLoading from "react-loading";
import { apiService } from "../../apiService/apiService";
import { Modal } from "bootstrap";
import { Modal as PicModal } from "../../component/common";
const APIPath = import.meta.env.VITE_API_PATH;
import { useToast } from "../../hook";
import { orderDefaultValue } from "../../data/defaultValue";
const OrderModal = (props) => {
  const { tempProduct, setIsProductModalOpen, isProductModalOpen } = props;
  const [modalProduct, setModalProduct] = useState(tempProduct);
  const updateToast = useToast();
  const productModalRef = useRef(null);
  const picModalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const closeProductModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
    setIsProductModalOpen(false);
  };
  const openProductModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.show();
  };

  const [toggleState, setToggleState] = useState({});
  const handleToggleDetail = (key) => {
    setToggleState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  console.log("setModalProduct:", modalProduct);
  useEffect(() => {
    if (productModalRef.current) {
      const modalElement = productModalRef.current;
      new Modal(productModalRef.current, { backdrop: true });
      const handleClose = () => {
        setToggleState({});
        setIsProductModalOpen(false);
      };
      modalElement.addEventListener("hidden.bs.modal", handleClose);
      return () => {
        modalElement.removeEventListener("hidden.bs.modal", handleClose);
      };
    }
  }, []);

  useEffect(() => {
    if (isProductModalOpen) {
      if (Object.keys(tempProduct).length > 0) setModalProduct(tempProduct);
      openProductModal();
    }
  }, [isProductModalOpen, tempProduct]);
  return (
    <>
      <div
        id="productModal"
        className="modal fade"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        ref={productModalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              {/* <h5 className="modal-title fs-4">訂單內容:{tempProduct.id}</h5> */}
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeProductModal}
                // data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <span className="text-success fw-bold">訂購商品資料:</span>
                {modalProduct !== undefined &&
                  Object.keys(modalProduct).length > 0 && (
                    <div className="modal-body p-4">
                      <div className="row g-4">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <ul className="list-group">
                              <li
                                className={`fw-bold ${
                                  modalProduct.is_paid
                                    ? "text-success"
                                    : "text-danger "
                                }`}
                              >
                                {modalProduct.is_paid ? "已付款" : "未付款"}
                              </li>
                            </ul>
                            {Object.entries(modalProduct.products).map(
                              ([key, value], index) => {
                                return (
                                  <Fragment key={key}>
                                    <div className="text-primary">
                                      訂購商品{index + 1}:
                                    </div>
                                    <span
                                      onClick={() => handleToggleDetail(key)}
                                      className={`toggle-span ${
                                        toggleState[key]
                                          ? "text-secondary"
                                          : "text-warning"
                                      }`}
                                      style={{
                                        cursor: "pointer",
                                        display: "inline-flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {toggleState[key]
                                        ? "隱藏詳細訊息🡅"
                                        : "顯示詳細訊息🡇"}
                                    </span>
                                    {toggleState[key] && (
                                      <ul className="list-group">
                                        <li>Order product list ID: {key}</li>
                                        <li>
                                          Product product ID:{" "}
                                          {value.product?.id}
                                        </li>
                                        <li>
                                          Product Title: {value.product?.title}
                                        </li>
                                        <li>
                                          Product Category:{" "}
                                          {value.product?.category}
                                        </li>
                                        <li>Product qty: {value.qty}</li>
                                        <li>
                                          Product Origin Price:{" "}
                                          {value.product?.origin_price}
                                        </li>
                                        <li>
                                          Product Price: {value.product?.price}
                                        </li>
                                        <li>Product Total: {value.total}</li>
                                      </ul>
                                    )}

                                    <hr />
                                  </Fragment>
                                );
                              }
                            )}
                            <p>總計:{modalProduct.total}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <div className="modal-footer border-top bg-light">
                <button
                  type="button"
                  className="btn btn-secondary"
                  aria-label="Close"
                  onClick={closeProductModal}
                >
                  取消
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  // onClick={handleUpdateOrder}
                >
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderModal;
