import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


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
                : popularCollection.map((e, index) => (
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
            {/* {new Array(6).fill(0).map((_, index) => (
              <div className="collection-column">
                <Link to="/collection" key={index} className="collection">
                  <img
                    src="https://i.seadn.io/gcs/files/a5414557ae405cb6233b4e2e4fa1d9e6.jpg?auto=format&dpr=1&w=1920"
                    alt=""
                    className="collection__img"
                  />
                  <div className="collection__info">
                    <h3 className="collection__name">Bored Ape Kennel Club</h3>
                    <div className="collection__stats">
                      <div className="collection__stat">
                        <span className="collection__stat__label">Floor</span>
                        <span className="collection__stat__data">0.46 ETH</span>
                      </div>
                      <div className="collection__stat">
                        <span className="collection__stat__label">
                          Total Volume
                        </span>
                        <span className="collection__stat__data">281K ETH</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}
