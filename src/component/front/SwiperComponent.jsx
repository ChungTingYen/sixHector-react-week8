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

const SwiperComponent = (props)=>{
  const { product } = props;
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

  return (
    <>
      <h3 className="fw-bold">產品細節</h3>
      {/* 這裡是 swiper/react */}
      <div className="swiper-container mt-4 mb-5">
        <SwiperReact
          modules={[Autoplay,Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            767: {
              slidesPerView: 3,
              spaceBetween: 30,
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
            product.imagesUrl?.filter(image=>image !== '').map((image,index)=>(
              <SwiperSlide key={index}>
                <div style={{ width: "250px", height: "250px" }} >
                  <img src={image} alt={`Slide${image}`} style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // 圖片充滿容器並保持比例
                    overflow: "hidden",
                  }}/>
                </div>
                <p className='fw-bold'>圖片{index + 1}</p>
              </SwiperSlide>
            ))
          }
        </SwiperReact>
      </div> 
      <hr />
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
    </>
  );
};
export default SwiperComponent;