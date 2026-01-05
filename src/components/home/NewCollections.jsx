import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import axios from "axios";
import Skeleton from "../ui/Skeleton";
import CollectionCard from "../ui/CollectionCard";
import CollectionCardSkeleton from "../ui/CollectionCardSkeleton";

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

      console.log(newCollectionData);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchNewCollection();
    setLoading(true);
  }, []);

  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">New Collections</h2>
          <div className="new-collections__body">
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
