import { useEffect, useState } from "react";
import { useNavigatePage } from "../../hook";
import { apiService } from "../../apiService/apiService";
import { Link } from "react-router-dom";
const APIPath = import.meta.env.VITE_API_PATH;
export default function CustomerInfoWithNoCartNavbar() {
  const navigate = useNavigatePage();
  const [time, setTime] = useState(10);
  const [order, setOrder] = useState("");
  const getOrder = async () => {
    try {
      const {
        data: { orders },
      } = await apiService.axiosGetByConfig(`/api/${APIPath}/orders`, {
        params: { page: 1 },
      });
      const order = orders
        .filter((item) => item.id !== undefined)
        .sort((a, b) => {
          return new Date(b.create_at) - new Date(a.create_at);
        })
        .filter((item, index) => index === 0);
      setOrder(order[0].id);
    } catch (error) {
      console.log(error);
    } 
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          navigate("/products");
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div className="d-flex flex-column flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
      <div className="col-md-10">
        <div className="text-dark mt-md-0 mt-3 fw-bold">
          <p>購物車無產品，{time} 秒後跳轉到商品頁。</p>
          <p>或是</p>
        </div>
        <Link to={`/payment/${order}`} className="btn btn-dark py-3 px-5">
          前往結帳
        </Link>
      </div>
    </div>
  );
}
