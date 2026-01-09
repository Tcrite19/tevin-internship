import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faShapes,
  faTag,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/ui/Skeleton";
import RecommendedItemsSkeleton from "../components/item/RecommendedItemsSkeleton";

export default function ItemPage() {
  const { id } = useParams();
  const [item, setitem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saleTime, setSaleTime] = useState("");
  const [collectionId, setCollectionId] = useState(null);

  useEffect(() => {
    if (!item?.expiryDate) return;

    function updateTime() {
      const timeLeft = item?.expiryDate - Date.now();
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);

      if (timeLeft < 0) {
        setSaleTime(`Expired`);
        return;
      }

      setSaleTime(`${hours}h ${minutes}m ${seconds}s`);
    }
    updateTime()
    const interval = setInterval(updateTime, 100)
  
    return () => clearInterval(interval)
  }, [item?.expiryDate]);

  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(
          `https://remote-internship-api-production.up.railway.app/item/${id}`
        );

        const itemData = data.data;

        setCollectionId(itemData.collectionId);

        setitem(itemData);

        setTimeout(() => {
          setLoading(false);
        }, 500);

      } catch (error) {
        alert(error);
      }
    }
    setLoading(true);
    fetchItem();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {loading ? (
        <>
          <section id="item-info">
            <div className="container">
              <div className="row item-page__row">
                <div className="item-page__left">
                  <figure className="item-page__img__wrapper">
                    <div className="item-page__img__details">
                      <FontAwesomeIcon
                        icon={faEthereum}
                        className="item-page__img__icon"
                      />
                      <div className="item-page__img__likes">
                        <Skeleton
                          width="40px"
                          height="16px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                    <Skeleton
                      className="item-page__img"
                      width="100%"
                      height="100%"
                    />
                  </figure>
                </div>
                <div className="item-page__right">
                  <div className="item-page__collection light-blue">
                    <Skeleton width="100px" height="16px" borderRadius="4px" />
                  </div>
                  <h1 className="item-page__name">
                    <Skeleton width="300px" height="16px" borderRadius="4px" />
                  </h1>
                  <span className="item-page__owner">
                    <div className="light-blue item-page__owner__link">
                      <Skeleton
                        width="150px"
                        height="16px"
                        borderRadius="4px"
                      />
                    </div>
                  </span>
                  <div className="item-page__details">
                    <div className="item-page__detail">
                      <span className="item-page__detail__text">
                        <Skeleton
                          width="100px"
                          height="16px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                    <div className="item-page__detail">
                      <span className="item-page__detail__text">
                        <Skeleton
                          width="100px"
                          height="16px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                    <div className="item-page__detail">
                      <span className="item-page__detail__text">
                        <Skeleton
                          width="100px"
                          height="16px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="item-page__sale">
                    <div className="item-page__sale__header">
                      <div className="green-pulse"></div>
                      <Skeleton
                        width="250px"
                        height="16px"
                        borderRadius="4px"
                      />
                    </div>
                    <div className="item-page__sale__body">
                      <span className="item-page__sale__label">
                        <Skeleton
                          height="14px"
                          width="70px"
                          borderRadius="4px"
                        />
                      </span>
                      <div className="item-page__sale__price">
                        <span className="item-page__sale__price__eth">
                          <Skeleton
                            height="14px"
                            width="150px"
                            borderRadius="4px"
                          />
                        </span>
                        <span className="item-page__sale__price__dollars">
                          <Skeleton
                            height="14px"
                            width="150px"
                            borderRadius="4px"
                          />
                        </span>
                      </div>
                      <div className="item-page__sale__buttons">
                        <Skeleton
                          height="34px"
                          width="750px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <RecommendedItemsSkeleton />
        </>
      ) : (
        <>
          <section id="item-info">
            <div className="container">
              <div className="row item-page__row">
                <div className="item-page__left">
                  <figure className="item-page__img__wrapper">
                    <div className="item-page__img__details">
                      <FontAwesomeIcon
                        icon={faEthereum}
                        className="item-page__img__icon"
                      />
                      <div className="item-page__img__likes">
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="item-page__img__icon"
                        />
                        <span className="item-page__img__likes__text">
                          {item?.favorites}
                        </span>
                      </div>
                    </div>
                    <img
                      src={item?.imageLink}
                      alt=""
                      className="item-page__img"
                    />
                  </figure>
                </div>
                <div className="item-page__right">
                  <Link
                    to={`/collection/${item?.collectionId}`}
                    className="item-page__collection light-blue"
                  >
                    {item?.collection}
                  </Link>
                  <h1 className="item-page__name">{item?.title}</h1>
                  <span className="item-page__owner">
                    Owned by{" "}
                    <Link
                      to={`/user/${item?.ownerId}`}
                      className="light-blue item-page__owner__link"
                    >
                      {item?.owner}
                    </Link>
                  </span>
                  <div className="item-page__details">
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {item?.views} views
                      </span>
                    </div>
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {item?.favorites} favorites
                      </span>
                    </div>
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faShapes}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {item?.category}
                      </span>
                    </div>
                  </div>
                  <div className="item-page__sale">
                    <div className="item-page__sale__header">
                      <div className="green-pulse"></div>
                      <span>Sale ends in {saleTime}</span>
                    </div>
                    <div className="item-page__sale__body">
                      <span className="item-page__sale__label">
                        Current price
                      </span>
                      <div className="item-page__sale__price">
                        <span className="item-page__sale__price__eth">
                          {item?.ethPrice} ETH
                        </span>
                        <span className="item-page__sale__price__dollars">
                          {item?.usdPrice}
                        </span>
                      </div>
                      <div className="item-page__sale__buttons">
                        <div className="item-page__sale__buy">
                          <button className="item-page__sale__buy__button disabled">
                            Buy now
                          </button>
                          <button className="item-page__sale__buy__icon disabled">
                            <FontAwesomeIcon icon={faShoppingBag} />
                          </button>
                        </div>
                        <button className="item-page__sale__offer disabled">
                          <FontAwesomeIcon icon={faTag} />
                          Make offer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {collectionId && (
            <RecommendedItems
              loading={loading}
              collectionId={collectionId}
              id={id}
            />
          )}
        </>
      )}
    </>
  );
}
