import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";
import AOS from "aos";
import 'aos/dist/aos.css';

export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchTrending() {
    try {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/trendingNFTs"
      );

      const trendingData = data.data;

      setTrending(trendingData);

      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchTrending();
    setLoading(true);
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <section id="trending">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header" data-aos="fade-up">
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to={"/collections"}>
              View All
            </Link>
          </div>
          <div
            className="trending__body"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {loading
                  ? new Array(5).fill(0).map((_, index) => (
                      <div className="trending-collection" key={index}>
                        <div className="trending-collection__rank">
                          {index + 1}
                        </div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <Skeleton width="100%" height="100%" />
                          </figure>
                          <div className="trending-collection__name">
                            <Skeleton
                              width="150px"
                              height="16px"
                              borderRadius="5px"
                            />
                          </div>
                        </div>
                        <div className="trending-collection__price">
                          <Skeleton
                            width="60px"
                            height="16px"
                            borderRadius="5px"
                          />
                        </div>
                        <div className="trending-collection__volume">
                          <Skeleton
                            width="80px"
                            height="16px"
                            borderRadius="5px"
                          />
                        </div>
                      </div>
                    ))
                  : trending?.slice(0, 5).map((e, index) => (
                      <Link
                        to={`/collection/${e.collectionId}`}
                        key={index}
                        className="trending-collection"
                      >
                        <div className="trending-collection__rank">
                          {index + 1}
                        </div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <img
                              src={e.imageLink}
                              alt=""
                              className="trending-collection__img"
                            />
                          </figure>
                          <div className="trending-collection__name">
                            {e.title}
                          </div>
                          <img
                            src={VerifiedIcon}
                            className="trending-collection__verified"
                          />
                        </div>
                        <div className="trending-collection__price">
                          <span className="trending-collection__price__span">
                            {Math.round(e.floor * 100) / 100} ETH
                          </span>
                        </div>
                        <div className="trending-collection__volume">
                          <span className="trending-collection__volume__span">
                            {e.totalVolume} ETH
                          </span>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
            <div className="trending-column">
              <div className="trending-column__header trending-column__header2">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {loading
                  ? new Array(5).fill(0).map((_, index) => (
                      <div className="trending-collection" key={index}>
                        <div className="trending-collection__rank">
                          {index + 6}
                        </div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <Skeleton width="100%" height="100%" />
                          </figure>
                          <div className="trending-collection__name">
                            <Skeleton
                              width="150px"
                              height="16px"
                              borderRadius="5px"
                            />
                          </div>
                        </div>
                        <div className="trending-collection__price">
                          <Skeleton
                            width="60px"
                            height="16px"
                            borderRadius="5px"
                          />
                        </div>
                        <div className="trending-collection__volume">
                          <Skeleton
                            width="80px"
                            height="16px"
                            borderRadius="5px"
                          />
                        </div>
                      </div>
                    ))
                  : trending?.slice(5, 10).map((e, index) => (
                      <Link
                        to={`/collection/${e.collectionId}`}
                        key={index}
                        className="trending-collection"
                      >
                        <div className="trending-collection__rank">
                          {index + 6}
                        </div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <img
                              src={e.imageLink}
                              alt=""
                              className="trending-collection__img"
                            />
                          </figure>
                          <div className="trending-collection__name">
                            {e.title}
                          </div>
                          <img
                            src={VerifiedIcon}
                            className="trending-collection__verified"
                          />
                        </div>
                        <div className="trending-collection__price">
                          <span className="trending-collection__price__span">
                            {Math.round(e.floor * 100) / 100} ETH
                          </span>
                        </div>
                        <div className="trending-collection__volume">
                          <span className="trending-collection__volume__span">
                            {e.totalVolume} ETH
                          </span>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
