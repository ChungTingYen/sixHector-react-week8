/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { apiService } from "../../apiService/apiService";
import { useNavigatePage } from "../../hook";
const APIPath = import.meta.env.VITE_API_PATH;
import { useToast , useGetCart } from "../../hook";
import { useEffect, useState, memo } from "react";
import { getCartSign } from '../../utils/utils';
import { useDispatch } from "react-redux";
const Product = (props) => {
  const { product, setIsLoading, wishList, setWishList } = props;
  const [isShowHart, setIsShowHart] = useState(false);
  const navigate = useNavigatePage();
  const updateToastInfo = useToast();
  const updateCartSign = useGetCart();
  const dispatch = useDispatch();
  const handleAddProductToCart = async () => {
    setIsLoading(true);
    try {
      const postData = {
        data: {
          product_id: product.id,
          qty: 1,
        },
      };
      await apiService.axiosPost(`/api/${APIPath}/cart`, postData);
      updateToastInfo("你的裝備已加入購物車", "secondary", true);
      // getCartSign(dispatch);
      updateCartSign();
    } catch (error) {
      console.log(error);
      updateToastInfo(`加入失敗:${error}`, "danger", true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleWishList = (e, productId) => {
    e.preventDefault();
    const wishListStorage = JSON.parse(localStorage.getItem("wishList")) || {};
    if (!wishListStorage[productId]) {
      const newWishList = { ...wishListStorage, [productId]: true };
      localStorage.setItem("wishList", JSON.stringify(newWishList));
      updateToastInfo("已加入心願清單", "success", true);
      setIsShowHart(true);
    } else {
      const newWishList = { ...wishListStorage };
      delete newWishList[productId];
      localStorage.setItem("wishList", JSON.stringify(newWishList));
      setIsShowHart(false);
      updateToastInfo("已從心願清單移除", "success", true);
      setWishList((prev) =>
        prev.filter((item) => {
          console.log(item);
          return item.includes(newWishList);
        })
      );
    }
  };
  useEffect(() => {
    (() => {
      wishList.includes(product.id) && setIsShowHart(true);
    })();
  }, []);

  return (
    <>
      <div className="col-md-6" key={product.id}>
        <div
          className="card border-0 mb-4 position-relative position-relative"
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "300px",
            maxHeight: "500px",
          }}
        >
          <span>{product.title}</span>
          <a
            href="#"
            className="text-dark"
            onClick={(e) => handleWishList(e, product.id)}
          >
            <i
              className={`${
                isShowHart ? "fas" : "far"
              } fa-heart position-absolute`}
              style={{
                right: "10%",
                top: "10%",
                color: "red",
                fontSize: "20px",
              }}
            ></i>
          </a>
          <img
            src={product.imageUrl}
            className="card-img-top rounded-0"
            alt={product.title}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // 圖片充滿容器並保持比例
              overflow: "hidden",
              cursor: "pointer",
            }}
          />
          <div className="card-body p-0">
            <h4 className="mb-0 mt-3">
              <Link
                to={`/product/${product.id}`}
                className="text-dark far fa-regular fa-file"
              >
                {" "}
                產品資訊
              </Link>
            </h4>
            <p className="card-text mb-0">
              NT${product.price.toLocaleString()}
              <span className="text-muted">
                {" "}
                <del className="text-danger">
                  NT${product.origin_price.toLocaleString()}
                </del>
              </span>
            </p>
            <p className="text-muted mt-3"></p>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleAddProductToCart}
          >
            加到購物車
          </button>
          <hr />
        </div>
      </div>
    </>
  );
};
export default memo(Product);
