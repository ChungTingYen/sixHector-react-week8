/* eslint-disable react/prop-types */
import { useRef, useState, useEffect, useCallback, Fragment } from "react";
import { apiService } from "../../apiService/apiService";
import { LoadingOverlay } from "../../component/front";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const APIPath = import.meta.env.VITE_API_PATH;
const RadioCollapse = (props) => {
  const { index, activeKey, handleToggle, title, id, contentRef, contents } =
    props;
  const handleDivClick = (index) => {
    const radio = document.querySelector(`#radio-${index}`);
    if (radio) {
      radio.click();
    } else {
      console.error(`Radio button with id #radio-${index} not found`);
    }
  };
  return (
    <>
      <div className="card rounded-0" onClick={() => handleDivClick(index)}>
        <div className={`card-header bg-white border-0 py-3 `}>
          <label className="me-3">
            <input
              type="radio"
              id={`radio-${index}`}
              name="accordion"
              className="form-check-input"
              value={index}
              checked={activeKey === index}
              onChange={(e) => handleToggle(e)}
            />
            <span className="ms-2">{title}</span>
          </label>
        </div>
        <div
          id={id}
          className="collapsible-content"
          ref={(el) => (contentRef.current[index] = el)}
        >
          {contents.length > 0 && (
            <div className="card-body bg-light ps-5 py-4">
              {contents.map((content) => (
                <div className="mb-2" key={content.id}>
                  <label htmlFor={content.id} className="text-muted mb-0">
                    {content.title}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={content.id}
                    placeholder={content.placeholder}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default function CheckoutPaymentPageFromCart() {
  const contentRef = useRef([]);
  const { id: inputId } = useParams();
  const [activeKey, setActiveKey] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [reload, setReload] = useState(true);
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
  const getCart = async () => {
    try {
      const {
        data: { data, success, message },
      } = await apiService.axiosGet(`/api/${APIPath}/cart`);
      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log("inputId in payment=", inputId);
    if (reload) {
      console.log("getCart");
      getCart();
      setReload(false);
    }
  }, []);
  useEffect(() => {
    contentRef.current[0].classList.toggle("show");
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-md-10 d-flex d-flex align-items-center justify-content-between">
              <div className="fw-bold">付款流程</div>
              <div>
                <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">購物車</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">建立訂單</span>
                  </li>
                  <li>
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">Lorem ipsum</span>
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
                {cart.carts?.map((cart) => (
                  <Fragment key={cart.id}>
                    <div className="d-flex mt-2">
                      <img
                        src={cart.product.imageUrl}
                        alt={cart.product.title}
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
                            {cart.product.title}
                          </div>
                          <p className="mb-0 fw-bold">數量:{cart.qty}</p>
                          <div className="mb-0">
                            NT$
                            {cart.final_total &&
                              cart.final_total.toLocaleString()}
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
                    NT${cart.final_total && cart.final_total.toLocaleString()}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
