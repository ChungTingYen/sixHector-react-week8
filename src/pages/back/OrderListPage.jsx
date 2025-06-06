import { useState, useCallback, useEffect, useRef,  } from "react";
import { apiServiceAdmin } from "../../apiService/apiService";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  Orders,
  OrderViewModal,
  OrderEditModal,
  // 舊context寫法，暫保留
  // ProductDetailModal,
  DeleteModal
} from "../../component/back";
// 舊context寫法，暫保留
// import * as utils from "../../utils/utils";
// import { ToastContext } from "../../component/back/ToastContext";
const APIPath = import.meta.env.VITE_API_PATH;
import { useFlashModal, } from '../../hook';

export default function OrderListPage() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [editProduct, setEditProduct] = useState({});
  const [modalMode, setModalMode] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 舊context寫法，暫保留
  // const [productDetailModalType, setProductDetailModalType] = useState("");
  // const ProductDetailModalRef = useRef(null);
  // const toastContextValue = useMemo(
  //   () => ({
  //     setProductDetailModalType,
  //     productDetailModalType,
  //   }),
  //   [setProductDetailModalType, productDetailModalType]
  // );

  const editOrderId = useRef(null);
  const updateFlashModal = useFlashModal();
  const getOrderData = useCallback(async (page = 1) => {
    updateFlashModal("loadingData",true);
    try {
      const resOrder = await apiServiceAdmin.axiosGetProductDataByConfig(
        `/api/${APIPath}/admin/orders`,
        { params: { page: page, }, }
      );
      setOrderData(
        resOrder.data.orders.filter((order) => {
          return order.id !== undefined;
        })
      );
      setPageInfo(resOrder.data.pagination);
    } catch (error) {
      console.log(error);
      navigate('/loginBackEnd');
    } finally {
      editOrderId.current = null;
      updateFlashModal("closing",false);
    }
  }, [navigate,updateFlashModal]);
  const handleGetOrders = useCallback(async () => {
    try {
      await getOrderData();
    } catch (error) {
      console.log(error);
      navigate('/loginBackEnd');
    } 
  },[navigate,getOrderData]);
  const handleDeleteModal = useCallback(
    (orderId) => {
      const updatedOrder =
        orderData.find((order) => order.id === orderId) ?? {};
      setEditProduct(updatedOrder);
      setIsDeleteModalOpen(true);
    },
    [orderData]
  );
  const handleOpenOrderModalWithValue = useCallback(
    (mode, orderId = null) => {
      if (mode === "edit") {
        let temp = orderData.find((order) => order.id === orderId);
        let products = { data: temp };
        setEditProduct(products);
        setModalMode(mode);
        setIsEditModalOpen(true);
        editOrderId.current = orderId;
      } else if (orderId && mode === "view") {
        setEditProduct(
          () => orderData.find((order) => order.id === orderId) ?? {}
        );
        setModalMode(mode);
        setIsViewModalOpen(true);
      }
    },
    [orderData]
  );
  useEffect(() => {
    handleGetOrders();
  }, [handleGetOrders]);
  return (
    <>
      {orderData.length > 0 ? (
        <>
          <div className="row mt-1 mb-2 mx-1">
            <div>
              <h3>產品列表</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th className="col-1">index</th>
                    <th className="col-1">訂單id</th>
                    <th className="col-1">付款</th>
                    <th className="col-1">金額</th>
                    <th className="col-1">功能</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((order, index) => {
                    return (
                      <Orders
                        key={order.id}
                        {...order}
                        index={index}
                        handleOpenOrderModalWithValue={
                          handleOpenOrderModalWithValue
                        }
                        handleDeleteModal={handleDeleteModal}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination getData={getOrderData} pageInfo={pageInfo} />
        </>
      ) : (
        <h1>沒有訂單或訂單載入中</h1>
      )}
      <OrderViewModal
        editProduct={editProduct}
        setModalMode={setModalMode}
        modalMode={modalMode}
        getData={getOrderData}
        isModalOpen={isViewModalOpen}
        setIsModalOpen={setIsViewModalOpen}
      />
      <DeleteModal
        setModalMode={setModalMode}
        modalMode={modalMode}
        getData={getOrderData}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        editData={editProduct}
        text='訂單'
        apiName='order'
      />
      <OrderEditModal
        editProduct={editProduct}
        setModalMode={setModalMode}
        modalMode={modalMode}
        getData={getOrderData}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        editOrderId={editOrderId}
      />

      {/* 舊context寫法，暫保留
      <ToastContext.Provider value={toastContextValue}>
        <ProductDetailModal
          ref={ProductDetailModalRef}
          modalBodyText="訊息"
          modalSize={{ width: "300px", height: "200px" }}
          modalImgSize={{ width: "300px", height: "120px" }}
        />
      </ToastContext.Provider> */}
    </>
  );
}
