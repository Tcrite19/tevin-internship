import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

export default function RecommendedItems({ collectionId, id }) {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    async function fetchCollection() {
      try {
        const { data } = await axios.get(
          `https://remote-internship-api-production.up.railway.app/collection/${collectionId}`
        );

        const collectionData = data.data;

        setCollection(collectionData.items);



      } catch (error) {
        alert(error);
      }
    }
    fetchCollection();
    window.scrollTo(0, 0);
  }, [collectionId]);

  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              <FontAwesomeIcon icon={faTableCells} />
              <h3 className="recommended-items__header__title">
                More from this collection
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
                {collection
                  .filter((e) => e.itemId !== id)
                  .slice(0, 10)
                  .map((e, index) => (
                    <SwiperSlide key={index}>
                      <Link
                        to={`/item/${e?.itemId}`}
                        key={index}
                        className="item"
                      >
                        <figure className="item__img__wrapper">
                          <img src={e.imageLink} alt="" className="item__img" />
                        </figure>
                        <div className="item__details">
                          <span className="item__details__name">{e.title}</span>
                          <span className="item__details__price">
                            {e.price} ETH
                          </span>
                          <span className="item__details__last-sale">
                            Last sale: {e.lastSale} ETH
                          </span>
                        </div>
                        <div className="item__see-more">
                          <button className="item__see-more__button">
                            See More
                          </button>
                          <div className="item__see-more__icon">
                            <FontAwesomeIcon icon={faShoppingBag} />
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="recommended-items__footer">
              <Link
                to={`/collection/${collectionId}`}
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
}
