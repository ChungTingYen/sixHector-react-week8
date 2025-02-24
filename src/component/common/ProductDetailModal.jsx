/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  memo,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import { useToast } from "../../component/back/ToastContext";

const ProductDetailModal = forwardRef((props, ref) => {
  const { modalBodyText, modalSize, modalImgSize } = props;
  const { productDetailModalType } = useToast();
  const modalDivRef1 = useRef(null);
  const modalRef1 = useRef(null);
  const imageRef = useRef(null);
  const getMessage = (productDetailModalType = null) => {
    if (imageRef.current) imageRef.current.style.display = "none";
    switch (productDetailModalType) {
    case "loading":
      return "進行中...";
    case "loadingData":
      return "載入資料中...";
    case "creating":
      return "建立中...";
    case "deleting":
      return "刪除中...";
    case "checking":
      return "檢查中...";
    default:
      return ".........";
    }
  };
  useEffect(() => {
    modalRef1.current = new Modal(modalDivRef1.current);
  }, []);
  const closeModal = () => {
    modalRef1.current.hide();
  };
  const openModal = () => {
    modalRef1.current.show();
  };

  useImperativeHandle(ref, () => {
    return {
      //open close2種寫法
      open() {
        openModal();
      },
      close() {
        closeModal();
      },
      // close: closeModal,
      // setModalImage: setImage,
      // setModalImage(src){
      //   setImageSrc(src);
      //   initRef.current = true;
      // },
      toggleFooter(visible) {
        if (visible) {
          modalDivRef1.current.querySelector(".modal-footer").style.display =
            "block";
        } else {
          modalDivRef1.current.querySelector(".modal-footer").style.display =
            "none";
        }
      },
      setModalImage(src) {
        if (imageRef.current) {
          imageRef.current.src = src;
          // 直接修改圖像的 src 屬性
        }
      },
      setImgAlt(text) {
        if (imageRef.current) {
          imageRef.current.alt = text;
          // 直接修改圖像的 alt 屬性
        }
      },
      //把modalDivRef1傳出去給父層控制
      modalDivRef1,
    };
  });
  return (
    <>
      <div
        className="modal fade"
        id="myModal"
        ref={modalDivRef1}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ zIndex: 1060 }}
      >
        <div className="modal-dialog" style={modalSize}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {/* 商品放大圖 */}
                {modalBodyText}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body d-flex justify-content-center align-items-center"
              style={modalImgSize}
              id="modalBody"
            >
              {getMessage(productDetailModalType)}
              <img
                // src={imageSrc}
                ref={imageRef}
                className="img-fluid"
                // alt="進行中"
                alt=""
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                id="picture"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                // data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default memo(ProductDetailModal);
