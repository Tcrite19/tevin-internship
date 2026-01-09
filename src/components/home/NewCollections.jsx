import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import axios from "axios";
import CollectionCard from "../ui/CollectionCard";
import CollectionCardSkeleton from "../ui/CollectionCardSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";

export default function NewCollections() {
  const [newCollection, setNewCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchNewCollection() {
    try {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/newCollections"
      );

      const newCollectionData = data.data;

      setNewCollection(newCollectionData);

      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchNewCollection();
    setLoading(true);
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title" data-aos="fade-up">
            New Collections
          </h2>
          <div
            className="new-collections__body"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <Swiper
              navigation
              modules={[Navigation]}
              loopAddBlankSlides={false}
              slidesPerView={6}
              spaceBetween={12}
              loop
              breakpoints={{
                0: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1020: { slidesPerView: 4 },
                1200: { slidesPerView: 5 },
                1600: { slidesPerView: 6 },
              }}
            >
              {loading
                ? new Array(9).fill(0).map((_, index) => (
                    <SwiperSlide key={index}>
                      <CollectionCardSkeleton />
                    </SwiperSlide>
                  ))
                : newCollection.map((e, index) => (
                    <SwiperSlide key={index}>
                      <CollectionCard collection={e} id={"collectionId"} />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
