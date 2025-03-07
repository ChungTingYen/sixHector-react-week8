/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
// import Swiper from "swiper";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Modal } from "../common";
const swiperConfig = {
  modules: [Autoplay, Navigation, Pagination, Scrollbar, A11y],
  loop: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  breakpoints: {
    256: {
      slidesPerView: 1, // 螢幕寬度小於 768px 時顯示 1 張幻燈片
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 3, // 螢幕寬度大於或等於 768px 時顯示 3 張幻燈片
      spaceBetween: 5,
    },
  },
  pagination: {
    clickable: true,
  },
  navigation: true,
};
const SwiperComponent = (props) => {
  const { product,swiperType } = props;
  const [image, setImage] = useState(0);
  const modalRef = useRef(null);
  const [shouldRenderSwiper, setShouldRenderSwiper] = useState(false);
  // 一般JS版本
  // const swiperContainerRef = useRef(null);
  // useEffect(() => {
  //   const swiperInstance = new Swiper(swiperContainerRef.current, swiperConfig)
  //   return () => {
  //     swiperInstance.destroy();
  //   };
  // }, []);
  const handleImageClick = (imageSrc) => {
    modalRef.current.setModalImage(imageSrc);
    modalRef.current.open();
  };
  useEffect(() => {
    if(product.imagesUrl){
      let swiperLoopLength = 1;
      if(swiperType){
        const imageCount = product.imagesUrl?.filter((image) => image !== "").length || 0;
        if(imageCount > 0){
          swiperLoopLength = imageCount <= 2 ? imageCount : imageCount - 1;
          setImage(swiperLoopLength);
          setShouldRenderSwiper(true); // 設置為 true，啟用渲染
        } else{
          setImage(swiperLoopLength);
          setShouldRenderSwiper(true); // 設置為 true，啟用渲染
        }
      }else{
        setImage(swiperLoopLength);
        setShouldRenderSwiper(true); // 設置為 true，啟用渲染
      }
      swiperConfig.breakpoints[768] =
      {
        slidesPerView: swiperLoopLength, // 螢幕寬度大於或等於 768px 時顯示 3 張幻燈片
        spaceBetween: 5,
      };
    }else {
      setShouldRenderSwiper(false); // 設置為 false，不渲染
    } 
  }, [product,swiperType]);
  return (
    <>
      {swiperType ?  <p className="badge text-bg-success fs-5">產品細節</p> : "" }
      {(shouldRenderSwiper) && (
        <div className="swiper-container mt-1">
          <SwiperReact {...swiperConfig} >
            {swiperType === 0
              ? product.imagesUrl
                ?.filter((image) => image !== "")
                .map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-6 mt-3 fw-bold">
                          <p className="">{image.content}</p>
                        </div>
                        <div
                          className="col-lg-8"
                          style={{ width: "100%", height: "500px" }}
                        >
                          <img
                            src={image.url}
                            alt={`Slide ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover", // 圖片充滿容器並保持比例
                              overflow: "hidden",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              : product.imagesUrl
                ?.filter((image) => image !== "")
                .map((image, index) => (
                  <SwiperSlide key={index} style={{
                    display: window.innerWidth < 768 ? 'flex' : 'block',
                    justifyContent: window.innerWidth < 768 ? 'center' : 'unset',
                    alignItems: window.innerWidth < 768 ? 'center' : 'unset' 
                  }}>
                    <div style={{ width: "250px", height: "250px" , position: "relative" }}>
                      <p className="fw-bold" 
                        style={{ position: "absolute", top: 0, zIndex: 1, backgroundColor: "rgba(255, 255, 255, 0.7)", padding:'5px' }}>圖片{index + 1}</p>
                      <img
                        src={image}
                        alt={`Slide${image + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover", // 圖片充滿容器並保持比例
                          overflow: "hidden",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick(image)}
                      />
                    </div>

                  </SwiperSlide>
                ))}
          </SwiperReact>
        </div>
      )}
      {/*  一般JS版本 */}
      {/* <div className="swiper mt-4 mb-5" ref={swiperContainerRef}>
        <div className="swiper-wrapper">
          {product.imagesUrl?.filter(image=>image !== '').map((image, index) => (
            <div className="swiper-slide" key={index}>
              <div className="card border-0 mb-4 position-relative">
                <div style={{ width: "250px", height: "250px" }} >
                  <img src={image} alt={`Slide${image}`} style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // 圖片充滿容器並保持比例
                    overflow: "hidden",
                  }}/>
                </div>
                <p className='fw-bold'>圖片{index + 1}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination"></div>
      </div> */}

      <Modal
        ref={modalRef}
        modalBodyText="商品放大圖"
        modalSize={{ width: "800px", height: "800px" }}
        // modalImgSize={{ width: "100%", height:'80%' }}可以不需要
      />
    </>
  );
};
export default SwiperComponent;
