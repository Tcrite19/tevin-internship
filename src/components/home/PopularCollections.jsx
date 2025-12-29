import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CollectionCard from "../ui/CollectionCard";
import CollectionCardSkeleton from "../ui/CollectionCardSkeleton";

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

      console.log(popularCollectionData);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchPopularCollection();
    setLoading(true);
  }, []);

  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2 className="popular-collections__title">Popular Collections</h2>
          <div className="popular-collections__body">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              slidesPerView={6}
              spaceBetween={16}
              loop={true}
            >
              {loading
                ? new Array(9).fill(0).map((_, index) => (
                    <SwiperSlide key={index}>
                      <CollectionCardSkeleton />
                    </SwiperSlide>
                  ))
                : popularCollection.map((e, index) => (
                    <SwiperSlide key={index}>
                      <CollectionCard collection={e} id={"collectionId"}/>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
