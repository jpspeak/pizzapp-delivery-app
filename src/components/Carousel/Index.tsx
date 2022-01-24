import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  return (
    <>
      <Swiper autoplay modules={[Navigation, Pagination]} pagination={{ clickable: true }} navigation spaceBetween={50} slidesPerView={1}>
        <SwiperSlide>
          <img src='/logo.png' alt='pizza' style={{ height: "400px", width: "100%", objectFit: "contain", objectPosition: "center" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/logo.png' alt='pizza' style={{ height: "400px", width: "100%", objectFit: "contain", objectPosition: "center" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/logo.png' alt='pizza' style={{ height: "400px", width: "100%", objectFit: "contain", objectPosition: "center" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/logo.png' alt='pizza' style={{ height: "400px", width: "100%", objectFit: "contain", objectPosition: "center" }} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
