import React from "react";
import Skeleton from "./Skeleton";

const CollectionCardSkeleton = () => {
  return (
    <div className="collection">
      <figure alt="" className="collection__img">
        <Skeleton width="100%" height="150px" borderRadius="4px" />
      </figure>
      <div className="collection__info">
        <h3 className="collection__name">
          <Skeleton width="100px" height="16px" borderRadius="4px" />
        </h3>
        <div className="collection__stats">
          <div className="collection__stat">
            <span className="collection__stat__label">
              <Skeleton width="60px" height="14px" borderRadius="4px" />
            </span>
            <span className="collection__stat__data">
              <Skeleton width="80px" height="14px" borderRadius="4px" />
            </span>
          </div>
          <div className="collection__stat">
            <span className="collection__stat__label">
              <Skeleton width="60px" height="14px" borderRadius="4px" />
            </span>
            <span className="collection__stat__data">
              <Skeleton width="70px" height="14px" borderRadius="4px" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCardSkeleton;
