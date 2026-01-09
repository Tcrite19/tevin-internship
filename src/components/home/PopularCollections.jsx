import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CollectionCard from "../ui/CollectionCard";
import CollectionCardSkeleton from "../ui/CollectionCardSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PopularCollections() {
  const [popularCollection, setPopularCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchPopularCollection() {
    try {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/popularCollections"
      );

      const popularCollectionData = data.data;

      setPopularCollection(popularCollectionData);

      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchPopularCollection();
    setLoading(true);
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2 className="popular-collections__title" data-aos="fade-up">
            Popular Collections
          </h2>
          <Swiper
            data-aos="fade-up"
            data-aos-delay="100"
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
            {loading
              ? new Array(9).fill(0).map((_, index) => (
                  <SwiperSlide key={index}>
                    <CollectionCardSkeleton />
                  </SwiperSlide>
                ))
              : popularCollection.map((e, index) => (
                  <SwiperSlide key={index}>
                    <CollectionCard collection={e} id={"collectionId"} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
