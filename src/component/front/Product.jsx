/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { apiService } from "../../apiService/apiService";

const APIPath = import.meta.env.VITE_API_PATH;
import { useToast } from '../../hook';
const Product = (props) => {
  const { product, handleSeeMore, setIsLoading } = props;
  const updateToast = useToast();
  const atHandleSeeMore = () => {
    handleSeeMore(product.id);
  };
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
      updateToast('加入完成','success',true);
    } catch (error) {
      console.log(error);
      updateToast('加入失敗','error',true);
    } finally {
      setIsLoading(false);
    }
  };
  return (<>
    <tr >
      <td
        style={{
          width: "150px",
          height: "150px",
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={atHandleSeeMore}
      >
        <img
          className="img-fluid"
          src={product.imageUrl}
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </td>
      <td>{product.title}</td>
      <td>
        <del className="h6">原價 {product.origin_price} 元</del>
        <div className="h5 text-danger">特價 {product.price} 元</div>
      </td>
    </tr>
    <tr className="border border-0 border-bottom border-info border-2">
      <td colSpan="3">
        <span><b>功能</b></span>
        <div className="btn-group btn-group-sm d-flex">
          <button
            onClick={atHandleSeeMore}
            type="button"
            className="btn btn-outline-secondary"
          >
            查看更多(Modal)
          </button>
          <Link
            to={`/product/${product.id}`}
            onClick={atHandleSeeMore}
            className="btn btn-outline-secondary"
          >
            查看更多(轉頁)
          </Link>
          <Link
            to={`/products/productBySide/${product.id}`}
            className="btn btn-outline-secondary"
          >
            查看更多(右側)
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleAddProductToCart}
          >
            加到購物車
          </button>
        </div>
      </td>
    </tr>
  </>
  );
};
export default Product;
