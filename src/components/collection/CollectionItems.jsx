import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function CollectionItems({ collection, loading }) {
  const [listLength, setListLength] = useState(12);
  const [sort, setSort] = useState("");
  const [sortedItemList, setSortedItemList] = useState([collection?.items]);

  function sortItemList() {
    if (sort === "HIGH_TO_LOW") {
      setSortedItemList(
        collection?.items.slice().sort((a, b) => b.price - a.price)
      );
    } else if (sort === "LOW_TO_HIGH") {
      setSortedItemList(
        collection?.items.slice().sort((a, b) => a.price - b.price)
      );
    } else {
      setSortedItemList(collection?.items);
    }
  }



  useEffect(() => {
    sortItemList();
  }, [sort]);

  return (
    <section id="collection-items">
      <div className="row collection-items__row">
        <div className="collection-items__header">
          <div className="collection-items__header__left">
            <span className="collection-items__header__live">
              <div className="green-pulse"></div>
              Live
            </span>
            <span className="collection-items__header__results">
              {collection?.items.length} results
            </span>
          </div>
          <select
            value={sort}
            className="collection-items__header__sort"
            onChange={(event) => setSort(event.target.value)}
          >
            <option value={""} disabled>
              Default
            </option>
            <option value="HIGH_TO_LOW">Price high to low</option>
            <option value="LOW_TO_HIGH">Price low to high</option>
          </select>
        </div>
        <div className="collection-items__body">
          {loading
            ? new Array(12).fill(0).map((_, index) => (
                <div key={index} className="item-column">
                  <div key={index} className="item">
                    <figure className="item__img__wrapper">
                      <Skeleton width="100%" height="100%" borderRadius="4px" />
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
                        <Skeleton width="50px" height="16px" borderRadius="4px" />
                      </span>
                      <span className="item__details__last-sale">
                        <Skeleton width="130px" height="16px" borderRadius="4px" />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            : sortedItemList?.slice(0, listLength).map((e, index) => (
                <div key={index} className="item-column">
                  <Link to={`/item/${e?.itemId}`} key={index} className="item">
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
      {listLength < collection?.items.length && (
        <button
          className="collections-page__button"
          onClick={() => setListLength(listLength + 6)}
        >
          Load more
        </button>
      )}
    </section>
  );
}
