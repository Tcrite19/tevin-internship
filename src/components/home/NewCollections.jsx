import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import axios from "axios";
import Skeleton from "../ui/Skeleton";

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
            >
              {loading
                ? new Array(9).fill(0).map((_, index) => (
                    <SwiperSlide key={index}>
                      <div className="collection">
                        <figure alt="" className="collection__img">
                          <Skeleton
                            width="100%"
                            height="150px"
                            borderRadius="4px"
                          />
                        </figure>
                        <div className="collection__info">
                          <h3 className="collection__name">
                            <Skeleton
                              width="100px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </h3>
                          <div className="collection__stats">
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                <Skeleton
                                  width="60px"
                                  height="14px"
                                  borderRadius="4px"
                                />
                              </span>
                              <span className="collection__stat__data">
                                <Skeleton
                                  width="80px"
                                  height="14px"
                                  borderRadius="4px"
                                />
                              </span>
                            </div>
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                <Skeleton
                                  width="60px"
                                  height="14px"
                                  borderRadius="4px"
                                />
                              </span>
                              <span className="collection__stat__data">
                                <Skeleton
                                  width="70px"
                                  height="14px"
                                  borderRadius="4px"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                : newCollection.map((e, index) => (
                    <SwiperSlide key={index}>
                      <Link
                        to={`/collection/${e.collectionId}`}
                        className="collection"
                      >
                        <img
                          src={e.imageLink}
                          alt=""
                          className="collection__img"
                        />
                        <div className="collection__info">
                          <h3 className="collection__name">{e.title}</h3>
                          <div className="collection__stats">
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                Floor
                              </span>
                              <span className="collection__stat__data">
                                {Math.round(e.floor * 100) / 100} ETH
                              </span>
                            </div>
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                Total Volume
                              </span>
                              <span className="collection__stat__data">
                                {e.totalVolume} ETH
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
