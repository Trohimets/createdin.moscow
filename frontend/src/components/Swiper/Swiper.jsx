import styles from "./styles.module.sass";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import { Navigation } from "swiper";




export const SwiperSlider = ({data}) => {
    console.log(data)
  return (
    <section className={styles.section}>
      {/* <h2 className={styles.title}>Наши отзывы, написанные "живой рукой"</h2> */}

      <div className={styles.wrapper}>
        <Swiper
          modules={[Navigation]}
          className={styles.container}
          navigation={true}
          rewind={true}
        >
          {data.images.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.item}>
                <img src={item} alt="" className={styles.img} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
