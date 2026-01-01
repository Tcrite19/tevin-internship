import React from "react";
import Skeleton from "../ui/Skeleton";

export default function CollectionInfo({ collection, loading }) {
  return (
    <section id="collection-info">
      <div className="row">
        {loading ? (
          <div className="collection-info__wrapper">
            <p className="collection-info__description">
              <Skeleton height="16px" width="640px" borderRadius="4px" />
              <Skeleton height="16px" width="640px" borderRadius="4px" />
              <Skeleton height="16px" width="640px" borderRadius="4px" />
              <Skeleton height="16px" width="400px" borderRadius="4px" />
            </p>
            <div className="collection-info__details">
              <span className="collection-info__detail">
                <Skeleton width="90px" height="16px" borderRadius="4px"/>
              </span>
              <span className="collection-info__detail">
                <Skeleton width="90px" height="16px" borderRadius="4px"/>
              </span>
              <span className="collection-info__detail">
                <Skeleton width="90px" height="16px" borderRadius="4px"/>
              </span>
              <span className="collection-info__detail">
                <Skeleton width="90px" height="16px" borderRadius="4px"/>
              </span>
            </div>
          </div>
        ) : (
          <div className="collection-info__wrapper">
            <p className="collection-info__description">
              {collection?.description}
            </p>
            <div className="collection-info__details">
              <span className="collection-info__detail">
                Items
                <span className="collection-info__detail__data">
                  {" "}
                  {collection?.items.length}
                </span>
              </span>
              ·
              <span className="collection-info__detail">
                Created
                <span className="collection-info__detail__data">
                  {" "}
                  {collection?.createdDate}
                </span>
              </span>
              ·
              <span className="collection-info__detail">
                Creator earnings
                <span className="collection-info__detail__data">
                  {" "}
                  {collection?.creatorEarnings}%
                </span>
              </span>
              ·
              <span className="collection-info__detail">
                Chain
                <span className="collection-info__detail__data">
                  {" "}
                  {collection?.chain}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
