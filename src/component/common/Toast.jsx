import { useRef, useEffect } from "react";
import { Toast } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowToastSlice, removeMessage } from "../../slice/toastSlice";
const { VITE_TOAST_SHOWTIME } = import.meta.env;
// import { useToast } from "../../hook";
// import { toastSliceDefaultValue } from "../../data/defaultValue";
const ToastComponent = () => {
  const toastDivRef = useRef({});
  // const { removeToastInfo } = useToast();
  const dispatch = useDispatch();
  //原本的單一toast寫法
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (toastDivRef.current) {
  //     new Toast(toastDivRef.current, {
  //       autohide: true,
  //       delay: parseInt(VITE_TOAST_SHOWTIME), // x秒後自動關閉
  //     });
  //     toastDivRef.current.addEventListener("hidden.bs.toast", () => {
  //       dispatch(setIsShowToastSlice(toastSliceDefaultValue));
  //     });
  //   }
  // }, []);
  // useEffect(() => {
  //   if (toastSlice.isShowToast) {
  //     showToast();
  //   }
  // }, [toastSlice.isShowToast]);
  const toastSlice = useSelector((state) => {
    return state.toastAtStore.toastInfo;
  });
  useEffect(() => {
    toastSlice.forEach((message) => {
      const toastElement = toastDivRef.current[message.id];
      if (toastElement) {
        const toastInstance = new Toast(toastElement, {
          autohide: true,
          delay: parseInt(VITE_TOAST_SHOWTIME), // x秒後自動關閉
        });
        toastInstance.show();
        setTimeout(() => {
          dispatch(removeMessage(message.id));
        }, VITE_TOAST_SHOWTIME);
      }
    });
  }, [toastSlice]);
  const closeToast = (messageId) => {
    // dispatch(removeMessage(messageId));
    //2種做法
    // console.log("messageId:", messageId);
    const toastElement = toastDivRef.current[messageId];
    if (toastElement) {
      const toastInstance = new Toast(toastElement);
      toastInstance.hide();
    }
  };

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      {toastSlice.map((message) => (
        <div
          key={message.id}
          // className={`toast text-bg-${message.type}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={(el) => (toastDivRef.current[message.id] = el)}
        >
          {/* <div className={`toast-header d-flex toast`}>
            <strong className="me-auto">
              {message.type ? "成功" : "失敗"}
            </strong>
          </div> */}
          <div className={`toast-body d-flex toast text-bg-${message.type}`}>
            <strong className="me-auto">
              {message.id}:{message.text}
            </strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => closeToast(message.id)}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastComponent;
