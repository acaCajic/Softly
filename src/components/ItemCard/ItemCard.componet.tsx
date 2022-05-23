import React, { useEffect, useMemo, useState } from 'react';
import Button from '../UI/Button';
import { Asset } from '../../models/Asset';
import classNames from 'classnames';
import api from '../../api';
import { Auction } from '../../models/Auction';
import { prepareDifferenceLabel } from '../../utils';

import './ItemCard.style.scss';
import './ItemCard.responsive.styles.scss';

type ItemCardProps = {
  className?: string;
  pictureUrl?: string;
  itemAsset?: Asset;
};

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { className, itemAsset } = props;

  const now = useMemo(() => new Date(), []);

  const [itemAuction, setItemAuction] = useState<Auction>(null);
  const [counter, setCounter] = useState<number>(0);

  const classes = classNames('sy-item-card', className);

  useEffect(() => {
    const loadAuction = async () => {
      try {
        const dataAuctions = await api.auctions.getAuction(
          itemAsset.auctionId.toString(),
        );

        setItemAuction(dataAuctions.data);
      } catch (error) {
      } finally {
      }
    };

    loadAuction();
  }, [itemAsset.auctionId]);

  useEffect(() => {
    const intervalId = setInterval(() => setCounter((old) => old + 1), 1000);

    return () => clearInterval(intervalId);
  }, []);

  console.log({ counter });

  return (
    <div className={classes}>
      <img
        src={itemAsset.pictureUrl || ''}
        alt="ItemCard"
        className="sy-item-card__picture"
        onError={(error) => {
          console.log(error);
          (error.target as HTMLImageElement).classList.add('img--error');
          (error.target as HTMLImageElement).src =
            '/assets/images/Rectangle6.png';
        }}
      />
      <label className="sy-item-card__lorem">{itemAsset.title}</label>
      <div className="sy-item-card__btn-box">
        <div className="sy-item-card__box">
          <p>Company</p>
          <p>{itemAsset.companyName}</p>
          <p>Time</p>
          <p>
            {itemAuction
              ? prepareDifferenceLabel(
                  now,
                  itemAuction.endDate as string,
                  counter,
                )
              : 'Loading...'}
          </p>
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
