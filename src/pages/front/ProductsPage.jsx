
import { useEffect, useState, useCallback } from "react";
import { apiService } from "../../apiService/apiService";
import { Product, LoadingOverlay, Pagination } from "../../component/front";
const APIPath = import.meta.env.VITE_API_PATH;

export default function ProductsPage() {
  const [toggle, setToggle] = useState([{ id: 1, toggle: true },{ id: 2, toggle: true }]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [category, setCategory] = useState(["全部"]);
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [wishList, setWishList] = useState([]);

  const getWishList = () => {
    const wishListStorage = JSON.parse(localStorage.getItem("wishList")) || {};
    setWishList(Object.keys(wishListStorage));
  };

  const getProducts = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const {
        data: { products, pagination, },
      } = await apiService.axiosGetByConfig(`/api/${APIPath}/products`, {
        params: {
          page: page,
          category: selectedCategory === "全部" ? "" : selectedCategory,
        },
      });
      setProducts(products);
      setPageInfo(pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  },[selectedCategory]);
  
  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };
  const scroll = () => {
    window.scrollTo(0, 200);
  };
  useEffect(() => {
    getCategory();
    getWishList();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
      scroll();
    };
    fetchData();
  }, [getProducts]);

  // useEffect(() => console.log("wishList:", wishList));

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
  const getCategory = async () => {
    try {
      const {
        data: { products, },
      } = await apiService.axiosGet(`/api/${APIPath}/products/all`);
      const category = [
        "全部",
        ...new Set(products.map((item) => item.category)),
      ];
      setCategory(category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
        <div className="container mt-md-1 mt-1 mb-1">
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
                    <div
                      className="d-flex justify-content-between align-items-center pe-1"
                      onClick={() => handleToggle(1)}
                    >
                      <h4 className="mb-0">產品分類</h4>
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>
                  <div
                    id="collapseOne"
                    className={`collapsible-content ${
                      toggle[0].toggle ? "show" : ""
                    }`}
                  >
                    <div className="card-body py-0">
                      <ul className="list-unstyled">
                        {category.map((item) => {
                          return (
                            <li key={item}>
                              <button
                                type="button"
                                onClick={() => handleSelectedCategory(item)}
                                className={`btn btn-border-none py-2 d-block text-muted 
                                ${
                            item === selectedCategory ? "bg-warning" : ""
                            }`}
                              >
                                {item}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                {products.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    setIsLoading={setIsLoading}
                    wishList={wishList}
                    setWishList={setWishList}
                  ></Product>
                ))}
              </div>
              <nav className="d-flex justify-content-center">
                <Pagination getData={getProducts} pageInfo={pageInfo} />
              </nav>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
