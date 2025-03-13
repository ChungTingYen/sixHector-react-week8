import { useState, useCallback, useEffect, useRef } from "react";
import { apiServiceAdmin } from "../../apiService/apiService";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  Coupons,
  CouponEditModal,
  OrderDeleteModal,
} from "../../component/back";
const APIPath = import.meta.env.VITE_API_PATH;
import { useFlashModal } from "../../hook";
import { tempCouponDefaultValue } from "../../data/defaultValue";

export default function CouponListPage() {
  const navigate = useNavigate();
  const [couponData, setCouponData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [editProduct, setEditProduct] = useState({});
  const [modalMode, setModalMode] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isProductDeleteModalOpen, setIsProductDeleteModalOpen] =
    useState(false);
  const editOrderId = useRef(null);
  const updateFlashModal = useFlashModal();
  const getCouponData = useCallback(
    async (page = 1) => {
      updateFlashModal("loadingData", true);
      try {
        const resCoupon = await apiServiceAdmin.axiosGetProductDataByConfig(
          `/api/${APIPath}/admin/coupons`,
          { params: { page: page } }
        );
        console.log("couponData:", resCoupon);
        setCouponData(
          resCoupon.data.coupons.filter((coupon) => {
            return coupon.id !== undefined;
          })
        );
        setPageInfo(resCoupon.data.pagination);
      } catch (error) {
        console.log(error);
        navigate("/loginBackEnd");
      } finally {
        editOrderId.current = null;
        updateFlashModal("closing", false);
      }
    },
    [navigate, updateFlashModal]
  );
  const handleGetCoupons = useCallback(async () => {
    try {
      await getCouponData();
    } catch (error) {
      console.log(error);
      navigate("/loginBackEnd");
    }
  }, [navigate, getCouponData]);
  const handleDeleteModal = useCallback(
    (orderId) => {
      const updatedOrder =
        couponData.find((order) => order.id === orderId) ?? {};
      setEditProduct(updatedOrder);
      setIsProductDeleteModalOpen(true);
    },
    [couponData]
  );
  const handleOpenEditModalWithValue = useCallback(
    (mode, couponId = null) => {
      console.log("handleOpenEditModalWithValue");
      if (mode === "create") {
        setEditProduct(tempCouponDefaultValue);
        setModalMode(mode);
      } else if (couponId && mode === "edit") {
        const updatedProduct =
          couponData.find((coupon) => coupon.id === couponId) ?? {};
        console.log("updatedProduct:", updatedProduct);
        setEditProduct(updatedProduct);
        setModalMode(mode);
      }
      setIsEditModalOpen(true);
    },
    [couponData]
  );
  useEffect(() => {
    handleGetCoupons();
  }, [handleGetCoupons]);
  return (
    <>
      {couponData.length > 0 ? (
        <>
          <div className="row mt-1 mb-2 mx-1">
            <div>
              <h3>優惠券列表</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th className="col-1" style={{ width: "5%" }}>
                      index
                    </th>
                    <th className="col-1" style={{ width: "10%" }}>
                      優惠券id
                    </th>
                    <th className="col-1" style={{ width: "5%" }}>
                      代碼
                    </th>
                    <th className="col-1" style={{ width: "10%" }}>
                      名稱
                    </th>
                    <th className="col-1" style={{ width: "5%" }}>
                      折扣
                    </th>
                    <th className="col-1" style={{ width: "10%" }}>
                      到期日
                    </th>
                    <th className="col-1" style={{ width: "5%" }}>
                      啟用
                    </th>
                    <th className="col-1" style={{ width: "10%" }}>
                      功能
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {couponData.map((coupon, index) => {
                    return (
                      <Coupons
                        key={coupon.id}
                        {...coupon}
                        index={index}
                        handleDeleteModal={handleDeleteModal}
                        handleOpenEditModalWithValue={
                          handleOpenEditModalWithValue
                        }
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination getData={getCouponData} pageInfo={pageInfo} />
        </>
      ) : (
        <h1>沒有優惠券或優惠券載入中</h1>
      )}
      <OrderDeleteModal
        setModalMode={setModalMode}
        modalMode={modalMode}
        getData={getCouponData}
        isProductDeleteModalOpen={isProductDeleteModalOpen}
        setIsProductDeleteModalOpen={setIsProductDeleteModalOpen}
        editProduct={editProduct}
      />
      <CouponEditModal
        editProduct={editProduct}
        setModalMode={setModalMode}
        modalMode={modalMode}
        getProductData={getCouponData}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </>
  );
}
