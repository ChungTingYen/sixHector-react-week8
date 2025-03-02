import { useCallback, useEffect, useState } from "react";
import { LoadingOverlay, Pagination, OrderModal } from "../../component/front";
import { apiService } from "../../apiService/apiService";
// import { useToast } from "../../hook";

const APIPath = import.meta.env.VITE_API_PATH;

export default function OrderListsPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  // const updateToast = useToast();
  const [tempOrder, setTempOrder] = useState();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  // console.log("OrderListsPage");
  const getOrders = async (page = 1) => {
    // console.log("getOrders");
    setIsLoading(true);
    try {
      const {
        data: { orders, pagination, success, message },
      } = await apiService.axiosGetByConfig(`/api/${APIPath}/orders`, {
        params: { page: page },
      });
      // console.log(orders, pagination);
      setOrders(
        orders
          .filter((order) => order.id !== undefined && order.id !== null)
          .sort((a, b) => {
            return new Date(b.create_at) - new Date(a.create_at);
          })
      );
      setPageInfo(pagination);
      // console.log("pagination=", pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
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
      console.log("OrderId=", OrderId);
    },
    [orders]
  );
  useEffect(() => {
    getOrders();
    console.log("orders:", orders);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="mt-3">
            <h3 className="mt-3 mb-4">您的訂單</h3>
          </div>
          {orders.length > 0 ? (
            <>
              <div className="container mt-md-5 mt-3 mb-7">
                <div className="row">
                  {orders.map((order) => (
                    <div className="col-md-4" key={order.id}>
                      <div className="row">
                        <div
                          className="card border-1 mb-4 position-relative bg-light text-black"
                          style={{
                            width: "230px",
                            height: "100px",
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
