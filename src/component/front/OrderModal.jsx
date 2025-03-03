/* eslint-disable indent */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
// import ReactLoading from "react-loading";
// import { apiService } from "../../apiService/apiService";
// const APIPath = import.meta.env.VITE_API_PATH;
//import { Modal as PicModal } from "../../component/common";
// import { Link } from "react-router-dom";
// import { useToast } from "../../hook";
import { Modal } from "bootstrap";
import { useNavigatePage } from "../../hook";

const OrderModal = (props) => {
  const { tempProduct, setIsProductModalOpen, isProductModalOpen } = props;
  const [modalProduct, setModalProduct] = useState(tempProduct);
  const navigate = useNavigatePage();
  const productModalRef = useRef(null);
  // const updateToast = useToast();
  // const picModalRef = useRef(null);
  // const [isLoading, setIsLoading] = useState(false);
  const closeProductModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
    setIsProductModalOpen(false);
  };
  const openProductModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.show();
  };
  const linkToPayment = () => {
    closeProductModal();
    navigate(`/payment/${modalProduct.id}`);
  };
  // console.log("setModalProduct:", modalProduct);
  useEffect(() => {
    if (productModalRef.current) {
      const modalElement = productModalRef.current;
      new Modal(productModalRef.current, { backdrop: true });
      const handleClose = () => {
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
    // console.log('modalProduct:',modalProduct);
  }, [isProductModalOpen, tempProduct]);
  return (
    <>
      <div
        id="productModal modal-lg"
        className="modal fade"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        ref={productModalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              <span className="modal-title">訂單內容</span>
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
                {/* <span className="text-success fw-bold">訂購商品資料:</span> */}
                {modalProduct !== undefined &&
                  Object.keys(modalProduct).length > 0 && (
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
                            小記
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(modalProduct.products).map(
                          ([key, value]) => (
                            <tr className="border-top" key={key}>
                              <th
                                scope="row"
                                className="border-0 px-0 font-weight-normal py-4"
                              >
                                <img
                                  src={value.product?.imageUrl}
                                  alt={value.product?.title}
                                  style={{
                                    width: "72px",
                                    height: "72px",
                                    objectFit: "cover",
                                  }}
                                />
                                <p className="mb-0 fw-bold ms-3 d-inline-block">
                                  {value.product?.title}
                                </p>
                              </th>
                              <td
                                className="border-0 align-middle"
                                style={{ maxWidth: "100px" }}
                              >
                                <div className="input-group pe-5">
                                  <span
                                    className="form-control border-0 text-center d-flex  justify-content-start my-auto shadow-none"
                                    placeholder=""
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                  >
                                    {value.qty}
                                  </span>
                                </div>
                              </td>
                              <td className="border-0 align-middle">
                                <p className="mb-0 ms-auto">
                                  NT${value.total.toLocaleString()}
                                </p>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="border-top">
                          <th colSpan="2" className="text-end border-0">
                            總價
                          </th>
                          <td className="text-end border-0">
                            NT${modalProduct.total?.toLocaleString()}{" "}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  )}
              </div>
              <div
                className="modal-footer bg-light"
                style={{ borderTop: "none" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  aria-label="Close"
                  onClick={closeProductModal}
                >
                  關閉視窗
                </button>
                {modalProduct !== undefined && !modalProduct.is_paid && (
                  <button
                    to="/payment"
                    className="btn btn-primary"
                    onClick={linkToPayment}
                  >
                    前往結帳
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderModal;
