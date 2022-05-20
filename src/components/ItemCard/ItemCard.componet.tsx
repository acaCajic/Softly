import React from 'react';
import Button from '../UI/Button';

import './ItemCard.style.scss';
import './ItemCard.responsive.styles.scss';

type ItemCardProps = {
  className?: string;
  pictureUrl?: string;
};

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { className, pictureUrl } = props;
  return (
    <div className="sy-item-card">
      <img
        // src="/assets/images/Rectangle6.png"
        src={pictureUrl || ''}
        alt="ItemCard"
        className="sy-item-card__picture"
        onError={(error) => {
          console.log(error);
          (error.target as HTMLImageElement).classList.add('img--error');
          (error.target as HTMLImageElement).src =
            '/assets/images/Rectangle6.png';
        }}
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
