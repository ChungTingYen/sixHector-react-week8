/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import  {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

const Modal = forwardRef((props, ref) => {
  const { modalBodyText, modalSize, } = props;
  const modalDivRef = useRef(null);
  const modalRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    modalRef.current = new bootstrap.Modal(modalDivRef.current);
  }, []);
  const closeModal = () => {
    modalRef.current.hide();
  };
  const openModal = () => {
    modalRef.current.show();
  };

  useImperativeHandle(ref, () => {
    return {
      //open close2種寫法
      open() {
        openModal();
      },
      close(){
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
          modalDivRef.current.querySelector(".modal-footer").style.display =
            "block";
        } else {
          modalDivRef.current.querySelector(".modal-footer").style.display =
            "none";
        }
      },
      setModalImage(src) {
        if (imageRef.current) { 
          imageRef.current.src = src; 
          // 直接修改圖像的 src 屬性 
        }
      },
      setImgAlt(text){
        if (imageRef.current) { 
          imageRef.current.alt = text; 
          // 直接修改圖像的 alt 屬性 
        }
      },
      //把modalDivRef傳出去給父層控制
      modalDivRef,
    };
  });
  return (
    <>
      <div
        className="modal fade"
        id="myModal"
        ref={modalDivRef}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={modalSize}>
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
              className="modal-body d-flex justify-content-center"
              // style={modalImgSize}
              style={{ width: "100%", height:'100%', maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}
              id="modalBody"
            >
              <img
                ref={imageRef}
                className="img-fluid"
                alt=''
                id="picture"
              />
            </div>
            <div className="text-end m-2 ">
              <button
                type="button"
                className="btn btn-danger "
                style={{ width: '20%' }}
                // data-bs-dismiss="modal"
                onClick={closeModal}
              >
                關閉視窗
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

Modal.propTypes = {
  modalBodyText:PropTypes.string,
  modalSize:PropTypes.object
};

export default Modal;

