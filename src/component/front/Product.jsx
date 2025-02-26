/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { apiService } from "../../apiService/apiService";
import { useNavigatePage } from "../../hook";
const APIPath = import.meta.env.VITE_API_PATH;
import { useToast } from '../../hook';
const Product = (props) => {
  const { product, setIsLoading } = props;
  const navigate = useNavigatePage();
  const updateToast = useToast();
  //   const atHandleSeeMore = () => {
  //     handleSeeMore(product.id);
  //   };
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
      console.log('handleAddProductToCart');
      updateToast('你的裝備已加入購物車','secondary',true);
    } catch (error) {
      console.log(error);
      updateToast('加入失敗','error',true);
    } finally {
      setIsLoading(false);
    }
  };
  return (<>
    <div className="col-md-6" key={product.id}>
      <div className="card border-0 mb-4 position-relative position-relative"
        style={{ width: "300px", height: "500px" }} >
        <span>{product.title}</span>
        <a href="#" className="text-dark">
          <i
            className="far fa-heart position-absolute"
            style={{ right: "16px", top: "50px" ,color:'red',fontSize:'20px' }}
          ></i>
        </a>
        <img
          src={product.imageUrl}
          className="card-img-top rounded-0"
          alt={product.title}
          onClick={()=>(navigate(`/product/${product.id}`))}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // 圖片充滿容器並保持比例
            overflow: "hidden",
            cursor: "pointer"
          }}
        />
        <div className="card-body p-0">
          <h4 className="mb-0 mt-3">
            <Link to={`/product/${product.id}`} 
              className="text-dark far fa-regular fa-file">{" "}產品資訊</Link>
          </h4>
          <p className="card-text mb-0">
            NT${product.price.toLocaleString()}
            <span className="text-muted">
              {" "}<del className="text-danger">NT${product.origin_price.toLocaleString()}</del>
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
export default Product;
