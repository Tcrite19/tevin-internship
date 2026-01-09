import Skeleton from "../ui/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

const RecommendedItemsSkeleton = () => {
  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              <h3 className="recommended-items__header__title">
                <Skeleton width="240px" height="16px" borderRadius="4px" />
              </h3>
            </div>
            <div className="recommended-items__body">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                slidesPerView={6}
                spaceBetween={16}
                loop={true}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  480: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1020: { slidesPerView: 4 },
                  1200: { slidesPerView: 5 },
                  1600: { slidesPerView: 6 },
                }}
              >
                {new Array(6).fill(0).map((_, index) => (
                  <div key={index} className="item-column">
                    <SwiperSlide>
                      <Link to={`/item/`} key={index} className="item">
                        <figure className="item__img__wrapper">
                          <Skeleton width="100%" height="100%" />
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
                              width="48px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                          <span className="item__details__last-sale">
                            <Skeleton
                              width="120px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                        </div>
                      </Link>
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>
            </div>
            <div className="recommended-items__footer">
              <Link
                to={`/collection/`}
                className="recommended-items__footer__button"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedItemsSkeleton;
