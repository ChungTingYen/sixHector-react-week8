/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
// import Swiper from "swiper";
import { Autoplay,Navigation, Pagination, Scrollbar, A11y  } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Modal } from "../common";
const SwiperComponent = (props)=>{
  const { product,slidesPerView } = props;
  const hasUrlRef = useRef(null);
  const modalRef = useRef(null);
  // 一般JS版本
  // const swiperContainerRef = useRef(null);
  // useEffect(() => {
  //   const swiperInstance = new Swiper(swiperContainerRef.current, {
  //     modules: [Autoplay,Navigation, Pagination, Scrollbar, A11y ],
  //     loop: true,
  //     autoplay: {
  //       delay: 2500,
  //       disableOnInteraction: false,
  //     },
  //     slidesPerView: 2,
  //     spaceBetween: 10,
  //     breakpoints: {
  //       767: {
  //         slidesPerView: 3,
  //         spaceBetween: 30,
  //       },
  //     },
  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable: true,
  //     },
  //     navigation:{
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     }
  //   });

  //   return () => {
  //     swiperInstance.destroy();
  //   };
  // }, []);
  hasUrlRef.current = product.imagesUrl?.some(item => typeof item === 'object');
  const handleImageClick = (imageSrc) => {
    modalRef.current.setModalImage(imageSrc);
    modalRef.current.open();
  };
  return (
    <>
      {
        hasUrlRef.current ? ""
          : <h3 className="fw-bold">產品細節</h3>
      }
      
      {/* 這裡是 swiper/react */}
      <div className="swiper-container mt-4 mb-5">
        <SwiperReact
          modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
          // spaceBetween={5}
          // slidesPerView={3} // 初始值設定為3張幻燈片
          //這裡如果加了，下面breakpoints會失效
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            767: {
              slidesPerView: 1, // 螢幕寬度小於767px時顯示1張幻燈片
              spaceBetween: 0,
            },
            768: {
              slidesPerView:  slidesPerView , // 螢幕寬度大於或等於768px時顯示3張幻燈片
              spaceBetween: 5,
            },
          }}
          navigation={{
            //react版本不需要加
            // nextEl: '.swiper-button-next',
            // prevEl: '.swiper-button-prev',
          }}
          pagination={{
            //react版本不需要加
            // el: '.swiper-pagination',
            clickable: true,
          }}
        >
          {
            hasUrlRef.current
              ?
              product.imagesUrl?.filter(image=>image !== '').map((image,index)=>(
                <SwiperSlide key={index}>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-6 mt-3 fw-bold">
                        <p className="">
                          {image.content}
                        </p>
                      </div>
                      <div className="col-lg-8" style={{ width: "100%", height: "500px" }}>
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
              :
              product.imagesUrl?.filter(image=>image !== '').map((image,index)=>(
                <SwiperSlide key={index}>
                  <div style={{ width: "250px", height: "250px" }} >
                    <img src={image} alt={`Slide${image}`} style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // 圖片充滿容器並保持比例
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageClick(image)}/>
                  </div>
                  <p className='fw-bold'>圖片{index + 1}</p>
                </SwiperSlide>
              ))
          }
        </SwiperReact>
      </div> 
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
        modalSize={{ width: "800px", height:'800px' }}
        // modalImgSize={{ width: "100%", height:'80%' }}可以不需要
      />
    </>
  );
};
export default SwiperComponent;