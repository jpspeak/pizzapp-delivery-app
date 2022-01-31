import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Image } from "@chakra-ui/react";

const Carousel = () => {
  return (
    <>
      <Swiper autoplay={{ delay: 3000 }} modules={[Navigation, Pagination, Autoplay]} pagination={{ clickable: true }} navigation spaceBetween={50} slidesPerView={1}>
        <SwiperSlide>
          <Image src='/pizzaone.png' alt='pizza' style={{ height: "500px", width: "100%", objectFit: "contain", objectPosition: "center" }} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src='/pizzatwo.png' alt='pizza' style={{ height: "500px", width: "100%", objectFit: "contain", objectPosition: "center" }} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src='/pizzathree.png' alt='pizza' style={{ height: "500px", width: "100%", objectFit: "contain", objectPosition: "center" }} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src='/pizzafour.png' alt='pizza' style={{ height: "500px", width: "100%", objectFit: "contain", objectPosition: "center" }} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
