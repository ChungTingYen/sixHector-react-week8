/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const SwiperComponent = (props)=>{
  const { product } = props;
  return (
    <>
      <h3 className="fw-bold">產品細節</h3>
      <div className="swiper-container mt-4 mb-5">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
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
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
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
        </Swiper>
      </div>
    </>
  );
};
export default SwiperComponent;