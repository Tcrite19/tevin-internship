import React from "react";

const Throwaway = () => {
  return (
    <div>
      new Array(12).fill(0).map((_, index) => (
      <div key={index} className="item-column">
        <div key={index} className="item">
          <figure className="item__img__wrapper">
            <Skeleton width="100%" height="100%" borderRadius="4px" />
          </figure>
          <div className="item__details">
            <span className="item__details__name">
              <Skeleton width="150px" height="16px" borderRadius="4px" />
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
    </div>
  );
};

export default Throwaway;
