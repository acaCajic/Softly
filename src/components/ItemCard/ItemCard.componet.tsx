import React from 'react';
import Button from '../UI/Button';

import './ItemCard.style.scss';

type ItemCardProps = {
  className?: string;
};

const ItemCard = () => {
  return (
    <div className="sy-item-card">
      <img
        src="/assets/images/Rectangle6.png"
        alt="ItemCard"
        className="sy-item-card__picture"
      />
      <label className="sy-item-card__lorem">Lorem Ipsum Dolor</label>
      <div className="sy-item-card__btn-box">
        <div className="sy-item-card__box">
          <p>Company</p>
          <p>Time</p>
        </div>
        <Button
          styleType="primary"
          variant="outline"
          className="sy-item-card__btn-bid"
        >
          BID
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;
