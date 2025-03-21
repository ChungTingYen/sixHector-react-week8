import { useState, useCallback, useEffect, useRef } from "react";
import { apiServiceAdmin } from "../../apiService/apiService";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  Coupons,
  CouponEditModal,
  DeleteModal
} from "../../component/back";
const APIPath = import.meta.env.VITE_API_PATH;
import { useFlashModal } from "../../hook";
import { tempCouponDefaultValue } from "../../data/defaultValue";

export default function CouponListPage() {
  const navigate = useNavigate();
  const [couponData, setCouponData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [editData, setEditData] = useState(tempCouponDefaultValue);
  const [modalMode, setModalMode] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
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
    (couponId) => {
      const updatedCoupon =
        couponData.find((coupon) => coupon.id === couponId) ?? {};
      setEditData(updatedCoupon);
      setIsDeleteModalOpen(true);
    },
    [couponData]
  );
  const handleOpenEditModalWithValue = useCallback(
    (mode, couponId = null) => {
      if (mode === "create") {
        setEditData(tempCouponDefaultValue);
        setModalMode(mode);
      } else if (couponId && mode === "edit") {
        const updatedProduct =
          couponData.find((coupon) => coupon.id === couponId) ?? {};
        setEditData(updatedProduct);
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
      <div className="row mt-2 mb-2 mx-1">
        <div className="d-flex justify-content-end align-items-center">
          <button
            type="button"
            className="btn btn-primary mx-1"
            onClick={() => handleOpenEditModalWithValue("create")}
          >
              建立新的優惠券
          </button>
        </div>
      </div>
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
      <DeleteModal
        editData={editData}
        setModalMode={setModalMode}
        modalMode={modalMode}
        getData={getCouponData}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        text='優惠券'
        apiName='coupon'
      />
      <CouponEditModal
        editData={editData}
        setModalMode={setModalMode}
        modalMode={modalMode}
        getData={getCouponData}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </>
  );
}
