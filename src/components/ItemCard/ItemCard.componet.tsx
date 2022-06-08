import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

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
  isStart?: boolean;
  showButton?: boolean;
  dataInRow?: boolean;
};

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const {
    className,
    itemAsset,
    isStart = false,
    showButton = true,
    dataInRow = false,
  } = props;

  const now = useMemo(() => new Date(), []);

  const [itemAuction, setItemAuction] = useState<Auction>(null);

  const classes = classNames('sy-item-card', className);

  useEffect(() => {
    const loadAuction = async () => {
      try {
        const dataAuctions = await api.auctions.getAuction(
          itemAsset?.auctionId.toString(),
        );

        setItemAuction(dataAuctions.data);
      } catch (error) {
      } finally {
      }
    };

    loadAuction();
  }, [itemAsset]);

  return (
    <div className={classes}>
      <img
        src={itemAsset.pictureUrl || ''}
        alt="ItemCard"
        className="sy-item-card__picture"
        onError={(error) => {
          (error.target as HTMLImageElement).classList.add('img--error');
          (error.target as HTMLImageElement).src =
            '/assets/images/Rectangle6.png';
        }}
      />
      <label className="sy-item-card__lorem">{itemAsset.title}</label>
      <div className="sy-item-card__btn-box">
        <div
          className={classNames('sy-item-card__box', {
            'sy-item-card__box--row': dataInRow,
          })}
        >
          <div className={dataInRow && 'sy-item-card__box--row__company'}>
            <p>Company </p>
            <p>{itemAsset.companyName}</p>
          </div>
          <div className={dataInRow && 'sy-item-card__box--row__time'}>
            <p>{isStart ? 'End time' : 'Start time'}</p>
            <p>
              {itemAuction
                ? prepareDifferenceLabel(now, itemAuction.endDate as string)
                : 'Loading...'}
            </p>
          </div>
        </div>

        {showButton && (
          <Link
            to={`/auctions-gallery/${itemAsset.id}`}
            className="sy-item-card__nav-link"
          >
            BID
          </Link>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
