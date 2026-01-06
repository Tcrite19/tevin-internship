import Skeleton from "../ui/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const RecommendedItemsSkeleton = () => {
  return (
    <>
      <section id="recommended-items">
        <div className="container">
          <div className="row recommended-items__row">
            <div className="recommended-items__wrapper">
              <div className="recommended-items__header">
                <Skeleton width="230px" height="16px" borderRadius="4px" />
              </div>
              <div className="recommended-items__body">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  slidesPerView={6}
                  spaceBetween={16}
                  loop={true}
                  breakpoints={{
                    0: {
                      width: 0,
                      slidesPerView: 1,
                    },
                    368: {
                      width: 368,
                      slidesPerView: 1,
                    },
                    768: {
                      width: 768,
                      slidesPerView: 2,
                    },
                    1024: {
                      width: 992,
                      slidesPerView: 3,
                    },
                    1220: {
                      width: 1220,
                      slidesPerView: 4,
                    },
                    1440: {
                      width: 1440,
                      slidesPerView: 5,
                    },
                  }}
                >
                  {new Array(9).fill(0).map((_, index) => (
                    <SwiperSlide key={index}>
                      <div key={index} className="item">
                        <figure className="item__img__wrapper">
                          <Skeleton width="100%" height="100%" className="item__img"/>
                        </figure>
                        <div className="item__details">
                          <span className="item__details__name">
                            <Skeleton
                              width="80px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                          <span className="item__details__price">
                            <Skeleton
                              width="80px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                          <span className="item__details__last-sale">
                            <Skeleton
                              width="80px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecommendedItemsSkeleton;
