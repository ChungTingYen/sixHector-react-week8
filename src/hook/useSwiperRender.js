import { useState,useEffect ,useRef } from "react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow
} from "swiper/modules";
const swiperConfig = {
  modules: [Autoplay, Navigation, Pagination, Scrollbar, A11y,EffectCoverflow],
  // effect:"coverflow",
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
function useSwiperRender(product,swiperType){
  const [shouldRenderSwiper, setShouldRenderSwiper] = useState(false);
  const imageRef = useRef(0);
  const [key,setKey] = useState(0);
  const handleResize = () => {
    if((window.innerWidth < 756 && window.innerWidth > 256) 
        || (window.innerWidth >= 756 && window.innerWidth < 900))
      setKey((prev)=>prev + 1);
  };
  useEffect(() => {
    if(product.imagesUrl){
      let swiperLoopLength = 1;
      if(swiperType){
        const imageCount = product.imagesUrl?.filter((image) => image !== "").length || 0;
        if(imageCount > 0){
          swiperLoopLength = imageCount <= 2 ? imageCount : imageCount - 1;
          imageRef.current = swiperLoopLength;
          setShouldRenderSwiper(true); // 設置為 true，啟用渲染
        } else{
          imageRef.current = swiperLoopLength;
          setShouldRenderSwiper(true); // 設置為 true，啟用渲染
        }
      }else{
        imageRef.current = swiperLoopLength;
        setShouldRenderSwiper(true); // 設置為 true，啟用渲染
      }
      swiperConfig.breakpoints[768] =
      {
        slidesPerView:imageRef.current,
        spaceBetween: 5,
      };
    }else {
      setShouldRenderSwiper(false); // 設置為 false，不渲染
    } 
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [product,swiperType,shouldRenderSwiper]);

  return { shouldRenderSwiper,swiperConfig ,key }; 
}
export default useSwiperRender;