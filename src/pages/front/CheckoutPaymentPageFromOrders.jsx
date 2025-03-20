 
import { useRef, useState, useEffect, useCallback, Fragment } from "react";
import { apiService } from "../../apiService/apiService";
import { LoadingOverlay,RadioCollapse } from "../../component/front";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const APIPath = import.meta.env.VITE_API_PATH;
import { useToast } from "../../hook";
import { useNavigatePage } from "../../hook";
import { getCartSign } from '../../utils/utils';
import { useDispatch } from "react-redux";

export default function CheckoutPaymentPageFromOrders() {
  const contentRef = useRef([]);
  const { id: inputId } = useParams();
  const [activeKey, setActiveKey] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [goods, setGoods] = useState({});
  const firstLoadRef = useRef(true);
  const navigate = useNavigatePage();
  const updateToast = useToast();
  const dispatch = useDispatch();
  const handleToggle = useCallback(
    (e) => {
      contentRef.current.forEach((ref, index) => {
        if (ref) {
          if (index.toString() === e.target.value) {
            if (activeKey !== e.target.value) {
              ref.classList.add("show");
              setActiveKey(e.target.value);
            }
          } else {
            ref.classList.remove("show");
          }
        }
      });
    },
    [activeKey]
  );

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const {
        data: { success,  },
      } = await apiService.axiosPost(`/api/${APIPath}/pay/${inputId}`);
      if (success) {
        updateToast("付款完成", "primary", true);
        getCartSign(dispatch);
        navigate("/orderList");
      }
    } catch (error) {
      console.log(error);
      updateToast("付款失敗", "danger", true);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getOrder = async () => {
      setIsLoading(true);
      try {
        const {
          data: { order },
        } = await apiService.axiosGet(`/api/${APIPath}/order/${inputId}`);
        setGoods(order);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if(firstLoadRef.current)
      getOrder(inputId);
  }, [inputId]);

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-md-10 d-flex d-flex align-items-center justify-content-between">
              <div>
                <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">訂購開始</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">購物車</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">收件人資料</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">建立訂單</span>
                  </li>
                  <li>
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">付款</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <h3 className="fw-bold mb-4 pt-3">付款方式</h3>
            </div>
          </div>
          <div className="row flex-row-reverse justify-content-center pb-5">
            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="fw-bold mb-4">購物清單</h4>
                {goods &&
                  goods.products &&
                  Object.entries(goods.products).map(([key, value]) => (
                    <Fragment key={key}>
                      <div className="d-flex mt-2">
                        <img
                          src={value.product.imageUrl}
                          alt={value.product.title}
                          className="me-2"
                          style={{
                            width: "48px",
                            height: "48px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="w-100">
                          <div>
                            <div className="mb-0 fw-bold">
                              {value.product.title}
                            </div>
                            <p className="mb-0 fw-bold">數量:{value.qty}</p>
                            <div className="mb-0">
                              NT${value.total && value.total.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                <hr />
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">總計</p>
                  <p className="mb-0 h4 fw-bold">
                    NT${goods.total && goods.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="accordion" id="accordionExample">
                <RadioCollapse
                  index="0"
                  activeKey={activeKey}
                  handleToggle={handleToggle}
                  title="信用卡"
                  contentRef={contentRef}
                  id="credit"
                  contents={[
                    {
                      id: "creditNumber",
                      title: "信用卡號",
                      placeholder: "123456789012",
                    },
                    {
                      id: "creditLast3Number",
                      title: "末3碼",
                      placeholder: "789",
                    },
                  ]}
                />
                <RadioCollapse
                  index="1"
                  activeKey={activeKey}
                  handleToggle={handleToggle}
                  title="Apple Pay"
                  contentRef={contentRef}
                  id="ApplePay"
                  contents={[
                    {
                      id: "ApplePay",
                      title: "號碼",
                      placeholder: "123456789012",
                    },
                  ]}
                />
                <RadioCollapse
                  index="2"
                  activeKey={activeKey}
                  handleToggle={handleToggle}
                  title="Line Pay"
                  contentRef={contentRef}
                  id="LinePay"
                  contents={[]}
                />
              </div>
              <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                <Link to="/products" className="text-dark mt-md-0 mt-3 fw-bold">
                  <i className="fas fa-chevron-left me-2"></i>
                  回到產品頁
                </Link>
                <button className="btn btn-dark py-3 px-5" onClick={handlePay}>
                  付款
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
