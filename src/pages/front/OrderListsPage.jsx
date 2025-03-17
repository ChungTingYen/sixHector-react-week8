import { useCallback, useEffect, useState } from "react";
import { LoadingOverlay, Pagination, OrderModal } from "../../component/front";
import { apiService } from "../../apiService/apiService";
const APIPath = import.meta.env.VITE_API_PATH;

export default function OrderListsPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [tempOrder, setTempOrder] = useState();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [width, setWidth] = useState(
    window.innerWidth <= 568 ? `${window.innerWidth * 0.1}px` : "230px"
  );
  const handleCreateTime = (time) => {
    const timestamp = time * 1000;
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Taipei",
    };
    const taiwanTime = date
      .toLocaleString("zh-TW", options)
      .replace(/\//g, "-");
    return taiwanTime;
  };
  const openProductDetailModal = () => {
    setIsOrderModalOpen(true);
  };
  const handleOpenOrderModal = useCallback(
    (OrderId) => {
      const temp = orders.find((item) => item.id === OrderId);
      setTempOrder(temp);
      openProductDetailModal();
      setIsLoading(false);
    },
    [orders]
  );

  const getOrders = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const {
        data: { orders, pagination },
      } = await apiService.axiosGetByConfig(`/api/${APIPath}/orders`, {
        params: { page: page },
      });
      setOrders(
        orders
          .filter((order) => order.id !== undefined && order.id !== null)
          .sort((a, b) => {
            return new Date(b.create_at) - new Date(a.create_at);
          })
      );
      setPageInfo(pagination);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  },[]);
  useEffect(() => {
    getOrders();
  }, [getOrders]);
  const handleResize = () => {
    const newWidth =
      window.innerWidth <= 768 ? `${window.innerWidth * 0.8}px` : "230px";
    setWidth(newWidth); // 更新狀態
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="mb-4">
            <h3 className="">您的訂單</h3>
          </div>
          {orders.length > 0 ? (
            <>
              <div className="container mt-md-5 mt-3 mb-7">
                <div className="row">
                  {orders.map((order) => (
                    <div className="col-md-4" key={order.id}>
                      <div className="">
                        <div
                          className="card border-1 mb-4 p-2 position-relative bg-light text-black mx-auto"
                          style={{
                            // width: "230px",
                            width: width,
                            height: "120px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpenOrderModal(order.id)}
                        >
                          <span>{order.id}</span>
                          <div className="card-body p-0">
                            <p className="card-text mb-0">
                              {handleCreateTime(order.create_at)}
                            </p>
                          </div>
                          <div className="card-body p-0">
                            <p className="card-text mb-0">
                              NT${order.total.toLocaleString()}
                            </p>
                          </div>
                          <div className="card-body p-0">
                            <p
                              className={`card-text mb-0 ${
                                order.is_paid ? "text-success" : "text-danger"
                              }`}
                            >
                              {order.is_paid ? "已付款" : "未付款"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Pagination getData={getOrders} pageInfo={pageInfo} />
            </>
          ) : (
            <h1>沒有訂單或訂單載入中</h1>
          )}
          {isLoading && <LoadingOverlay />}
        </div>
      </div>
      <OrderModal
        tempProduct={tempOrder}
        isProductModalOpen={isOrderModalOpen}
        setIsProductModalOpen={setIsOrderModalOpen}
      />
    </>
  );
}
