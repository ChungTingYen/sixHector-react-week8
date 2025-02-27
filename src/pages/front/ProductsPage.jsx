import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../../apiService/apiService";
import { Product, LoadingOverlay, Pagination } from "../../component/front";

import { useNavigatePage } from "../../hook";
const APIPath = import.meta.env.VITE_API_PATH;
// import { ProductModal } from "../../component/front";
// import { tempProductDefaultValue } from "../../data/data";
export default function ProductsPage() {
  const [toggle,setToggle] = useState([{ id:1,toggle:false },{ id:2,toggle:false }]);
  const [products, setProducts] = useState([]);
  // const [tempProduct, setTempProduct] = useState(tempProductDefaultValue);
  // const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigatePage();
  // const openProductDetailModal = () => {
  //   setIsProductModalOpen(true);
  // };
  // const handleSeeMore = useCallback(
  //   (productId) => {
  //     const temp = products.find((item) => item.id === productId);
  //     setTempProduct(temp);
  //     openProductDetailModal();
  //     // navigate(`/products/productBySide/${productId}`);
  //   },
  //   [products]
  // );
  const getProducts = async (page = 1) => {
    setIsLoading(true);
    try {
      const {
        data: { products, pagination, success, message },
      } = await apiService.axiosGetByConfig(`/api/${APIPath}/products`,
        { params: { page: page, }, }
      );
      setProducts(products);
      setPageInfo(pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const scroll = ()=>{
    window.scrollTo(0, 100); 
    console.log('scroll');
  };
  useEffect(() => {
    getProducts();
    scroll();
  }, []);
  const handleToggle = (id) => {
    // 找到目標對象
    const targetIndex = toggle.findIndex((item) => item.id === id);
    if (targetIndex !== -1) {
      const newToggle = [...toggle];
      // 更新目標對象的值
      newToggle[targetIndex] = {
        ...newToggle[targetIndex],
        toggle: !newToggle[targetIndex].toggle,
      };
      // 設置新的狀態
      setToggle(newToggle);
    }
  };
  return (<>
    <div className="container-fluid">
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ minHeight: "400px" }}
      >
        <div
          className="position-absolute"
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage:
                "url(https://images.unsplash.com/photo-1613837295512-0375f9cb6159?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundPosition: "center center",
            opacity: 0.1,
          }}
        ></div>
        <h2 className="fw-bold">產品列表</h2>
      </div>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          <div className="col-md-4">
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            >
              <div className="card border-0">
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingOne"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1" 
                    onClick={()=>handleToggle(1)}>
                    <h4 className="mb-0">Lorem ipsum</h4>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div
                  id="collapseOne"
                  className={`collapsible-content ${toggle[0].toggle ? 'show' : ''}`}
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card border-0">
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingTwo"

                >
                  <div className="d-flex justify-content-between align-items-center pe-1" onClick={()=>handleToggle(2)}>
                    <h4 className="mb-0">Lorem ipsum</h4>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div
                  id="collapseTwo"
                  className={`collapsible-content ${toggle[1].toggle ? 'show' : ''}`}
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card border-0">
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingThree"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">Lorem ipsum</h4>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                            Lorem ipsum
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              {
                products.map((product)=>(
                  <Product
                    key={product.id}
                    product={product}
                    setIsLoading={setIsLoading}
                  ></Product>
                )
                )
              }
            </div>
            <nav className="d-flex justify-content-center">
              <Pagination getData={getProducts} pageInfo={pageInfo} />
              {/* <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                      1
                  </a>
                  {/* </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                      2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                      3
                  </a>
                </li> 
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul> */}
            </nav>
          </div>
        </div>
      </div>
    </div>
    {isLoading && <LoadingOverlay />}
  </>
  );
}
  