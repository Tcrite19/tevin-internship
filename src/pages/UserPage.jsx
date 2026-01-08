import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/ui/Skeleton";

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listLength, setListLength] = useState(12);
  const [sort, setSort] = useState("");
  const [sortedItemList, setSortedItemList] = useState([user?.items]);

  async function fetchUser() {
    try {
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/user/${id}`
      );

      const userData = data.data;

      setUser(userData);

      setSortedItemList(userData.items);


      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  function sortItemList() {
    if (sort === "HIGH_TO_LOW") {
      setSortedItemList(user?.items.slice().sort((a, b) => b.price - a.price));
    } else if (sort === "LOW_TO_HIGH") {
      setSortedItemList(user?.items.slice().sort((a, b) => a.price - b.price));
    }
  }

  useEffect(() => {
    fetchUser();
    setLoading(true);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    sortItemList();
  }, [sort]);

  return (
    <>
      {loading ? (
        <>
          <header id="user-header">
            <Skeleton width="100%" height="100%" />
          </header>

          <section id="user-info">
            <div className="row">
              <div className="user-info__wrapper">
                <figure className="user-info__img__wrapper">
                  <Skeleton width="100%" height="100%" />
                </figure>
                <h1 className="user-info__name">
                  <Skeleton width="250px" height="16px" borderRadius="4px" />
                </h1>
                <div className="user-info__details">
                  <span className="user-info__wallet">
                    <Skeleton width="300px" height="16px" borderRadius="4px" />
                  </span>
                  <span className="user-info__year">
                    <span className="user-info__year__data">
                      <Skeleton
                        width="150px"
                        height="16px"
                        borderRadius="4px"
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section id="user-items">
            <div className="row user-items__row">
              <div className="user-items__header">
                <div className="user-items__header__left">
                  <span className="user-items__header__text">
                    <Skeleton width="100px" height="16px" borderRadius="4px" />
                  </span>
                </div>
                <select
                  value={sort}
                  className="collection-items__header__sort"
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="" disabled default selected>
                    Default
                  </option>
                  <option value="HIGH_TO_LOW">Price high to low</option>
                  <option value="LOW_TO_HIGH">Price low to high</option>
                </select>
              </div>
              <div className="user-items__body">
                {new Array(12).fill(0).map((_, index) => (
                  <div key={index} className="item-column">
                    <div key={index} className="item">
                      <figure className="item__img__wrapper">
                        <Skeleton
                          width="100%"
                          height="100%"
                          borderRadius="4px"
                        />
                      </figure>
                      <div className="item__details">
                        <span className="item__details__name">
                          <Skeleton
                            width="150px"
                            height="16px"
                            borderRadius="4px"
                          />
                        </span>
                        <span className="item__details__price">
                          <Skeleton
                            width="50px"
                            height="16px"
                            borderRadius="4px"
                          />
                        </span>
                        <span className="item__details__last-sale">
                          <Skeleton
                            width="130px"
                            height="16px"
                            borderRadius="4px"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
       
          </section>
        </>
      ) : (
        <>
          <header
            style={{
              backgroundImage: `url(${user?.imageLink})`,
            }}
            id="user-header"
          ></header>

          <section id="user-info">
            <div className="row">
              <div className="user-info__wrapper">
                <figure className="user-info__img__wrapper">
                  <img
                    src={user?.profilePicture}
                    alt=""
                    className="user-info__img"
                  />
                </figure>
                <h1 className="user-info__name">{user?.name}</h1>
                <div className="user-info__details">
                  <span className="user-info__wallet">
                    <FontAwesomeIcon
                      icon={faEthereum}
                      className="user-info__wallet__icon"
                    />
                    <span className="user-info__wallet__data">
                      {user?.walletCode}
                    </span>
                  </span>
                  <span className="user-info__year">
                    <span className="user-info__year__data">
                      Joined {user?.creationDate}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section id="user-items">
            <div className="row user-items__row">
              <div className="user-items__header">
                <div className="user-items__header__left">
                  <span className="user-items__header__text">
                    {user?.items.length} items
                  </span>
                </div>
                <select
                  value={sort}
                  className="collection-items__header__sort"
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="" disabled default selected>
                    Default
                  </option>
                  <option value="HIGH_TO_LOW">Price high to low</option>
                  <option value="LOW_TO_HIGH">Price low to high</option>
                </select>
              </div>
              <div className="user-items__body">
                {sortedItemList?.slice(0, listLength).map((e, index) => (
                  <div key={index} className="item-column">
                    <Link
                      to={`/item/${e?.itemId}`}
                      key={index}
                      className="item"
                    >
                      <figure className="item__img__wrapper">
                        <img src={e?.imageLink} alt="" className="item__img" />
                      </figure>
                      <div className="item__details">
                        <span className="item__details__name">{e?.title}</span>
                        <span className="item__details__price">
                          {e?.price} ETH
                        </span>
                        <span className="item__details__last-sale">
                          Last sale: {e?.lastSale} ETH
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
                  </div>
                ))}
              </div>
            </div>
            {listLength < user?.items.length && (
              <button
                className="collection-page__button"
                onClick={() => setListLength(listLength + 6)}
              >
                Load more
              </button>
            )}
          </section>
        </>
      )}

    </>
  );
}
