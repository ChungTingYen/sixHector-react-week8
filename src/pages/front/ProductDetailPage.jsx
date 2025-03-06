import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactLoading from "react-loading";
import { apiService } from "../../apiService/apiService";
import { Link } from "react-router-dom";
const APIPath = import.meta.env.VITE_API_PATH;
import "react-lazy-load-image-component/src/effects/blur.css"; // 引入模糊效果的 CSS
import PlaceholderImage from "../../img/loading.jpg";
import { useToast } from "../../hook";
import { SwiperComponent } from "../../component/front";
import { getCartSign } from '../../utils/utils';
import { useDispatch } from "react-redux";
export default function ProductDetailPage() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0); // 自動滾動到頂部
  }, []); //
  const updateToast = useToast();
  const getProductById = async () => {
    try {
      const {
        data: { product, success, message },
      } = await apiService.axiosGet(`/api/${APIPath}/product/${productId}`);
      setProduct(product);
    } catch (error) {
      console.log(error);
    }
  };
  const addProductTocart = async () => {
    setIsButtonLoading(true);
    try {
      const postData = {
        data: {
          product_id: productId,
          qty: qtySelect,
        },
      };
      await apiService.axiosPost(`/api/${APIPath}/cart`, postData);
      updateToast("裝備加入購物車完成", "success", true);
      getCartSign(dispatch);
    } catch (error) {
      console.log(error);
      updateToast("加入失敗", "success", true);
    } finally {
      setIsButtonLoading(false);
    }
  };
  useEffect(() => {
    getProductById();
  }, []);
  useEffect(()=>{
    console.log('product:',product);
  });
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-7">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <LazyLoadImage
                    src={product.imageUrl}
                    className="d-block w-100"
                    alt={product.title}
                    placeholderSrc={PlaceholderImage}
                    effect="blur" // 可選，添加模糊效果
                    width="100%"
                    height="400%"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className="col-md-5">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                <li className="breadcrumb-item">
                  <Link className="text-muted" to="/">
                    首頁
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link className="text-muted" to="/products">
                    產品列表
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  產品資訊
                </li>
              </ol>
            </nav>
            <h2 className="fw-bold h1 mb-1">{product.title}</h2>
            <span className="badge text-bg-success">{product.category}</span>
            <p className="mb-3">{product.description}</p>
            {/* <p className="mb-3">內容:{product.content}</p> */}
            <p className="mb-0 text-muted text-end">
              <del className="text-danger">
                NT${product.origin_price?.toLocaleString()}
              </del>
            </p>
            <p className="h4 fw-bold text-end">
              NT${product.price?.toLocaleString()}
            </p>
            <div className="row align-items-center">
              <div className="col-6">
                <div className="input-group my-3 bg-light rounded">
                  <select
                    value={qtySelect}
                    onChange={(e) => setQtySelect(parseInt(e.target.value))}
                    id="qtySelect"
                    className="form-select border-secondary"
                  >
                    {Array.from({ length: 10 }).map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-dark align-items-center w-100"
                  onClick={addProductTocart}
                >
                  <div className="d-flex justify-content-center">
                    加入購物車
                    {isButtonLoading && (
                      <ReactLoading
                        type={"spin"}
                        color={"#000"}
                        height={"1.5rem"}
                        width={"1.5rem"}
                        className="ms-2"
                      />
                    )}
                  </div>
                </button>
              </div>
              <div className="col-6">
                <Link to="/products" className="btn btn-primary w-100">
                  回到商品頁
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row my-5">
          <div className="col-md-4">
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et
            </p>
          </div>
          <div className="col-md-3">
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor
            </p>
          </div>
        </div> */}
        <SwiperComponent product={product} slidesPerView='3'/>
      </div>
    </div>
  );
}
