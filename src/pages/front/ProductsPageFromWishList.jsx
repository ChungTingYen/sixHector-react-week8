import { useEffect, useState, useCallback } from "react";
import { apiService } from "../../apiService/apiService";
import { Product, LoadingOverlay, Pagination } from "../../component/front";
const APIPath = import.meta.env.VITE_API_PATH;
import { useSelector,useDispatch } from "react-redux";
import { getWishList } from '../../slice/wishListSlice';
export default function ProProductsPageFromWishList() {
  // const [toggle, setToggle] = useState([
  //   { id: 1, toggle: true },
  // ]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [pageInfo, setPageInfo] = useState({});
  // const [category,setCategory] = useState([]);
  // const [selectedCategory,setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const wishList = useSelector(state => {
    console.log(Object.keys(state.wishListAtStore));
    return Object.keys(state.wishListAtStore);
  });
  const wishListFromStore = useSelector(state => {
    return state.wishListAtStore;
  });
  const getProducts = async () => {
    setIsLoading(true);
    try {
      const {
        data: { products, pagination, success, message },
      } = await apiService.axiosGet(`/api/${APIPath}/products/all`);
      // console.log(products.filter((item)=>wishList.includes(item.id) ));
      // console.log(products.filter((item)=>wishList.includes(item.id) ));
      setProducts(products.filter((item)=>wishList.includes(item.id) ));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const scroll = () => {
    window.scrollTo(0, 500);
  };
  useEffect(() => {
    dispatch(getWishList()); // 在組件加載時調用 getWishList action
  }, [dispatch]);
  useEffect(()=>{
    getProducts();
  },[]);
  useEffect(() => {
    scroll();
  }, []);

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
        <div className="container mt-md-5 mt-3 mb-7">
          <div className="row">
            <div className="col-md-4">
              <div
                className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
                id="accordionExample"
              >
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                {products.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    setIsLoading={setIsLoading}
                    wishList={wishListFromStore}
                  ></Product>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
