import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import { apiServiceAdmin } from "../../apiService/apiService";
const APIPath = import.meta.env.VITE_API_PATH;
import { useFlashModal,useToast } from "../../hook";
export default function DeleteModal(props) {
  const {
    editData,
    setModalMode,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    getData,
    text,
    apiName
  } = props;
  const deleteModalDivRef = useRef();
  const updateFlashModal = useFlashModal();
  const updateToast = useToast();
  const closeDeleteModal = () => {
    const modalInstance = Modal.getInstance(deleteModalDivRef.current);
    modalInstance.hide();
    setModalMode(null);
    setIsDeleteModalOpen(false);
  };
  const openDeleteModal = () => {
    const modalInstance = Modal.getInstance(deleteModalDivRef.current);
    modalInstance.show();
  };
  const deleteProductInModal = async () => {
    if (editData?.id === null) return;
    closeDeleteModal();
    updateFlashModal('deleting',true);
    try {
      await apiServiceAdmin.axiosDelete(
        `/api/${APIPath}/admin/${apiName}/${editData.id}`
      );
      setModalMode(null);
      getData();
      updateFlashModal('deleting',true);
      updateToast("完成刪除!","primary",true);
    } catch (error) {
      console.error(`刪除${text}時發生錯誤：`, error);
    } finally {
      updateFlashModal('closing',false);
      closeDeleteModal();
    }
  };
  useEffect(() => {
    if (deleteModalDivRef.current) {
      new Modal(deleteModalDivRef.current, { backdrop: false });
    }
  }, []);
  useEffect(() => {
    if (isDeleteModalOpen) openDeleteModal();
  }, [isDeleteModalOpen]);
  return (
    <>
      <div
        className="modal fade"
        id="delProductModal"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        ref={deleteModalDivRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">刪除{text}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              你是否要刪除編號
              <span className="text-danger fw-bold">{editData.id}</span>{" "}
              的{text}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeDeleteModal}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={deleteProductInModal}
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
DeleteModal.propTypes = {
  editData:PropTypes.object,
  setModalMode:PropTypes.func,
  isDeleteModalOpen:PropTypes.bool,
  setIsDeleteModalOpen:PropTypes.func,
  getData:PropTypes.func,
  text:PropTypes.string,
  apiName:PropTypes.string
};
