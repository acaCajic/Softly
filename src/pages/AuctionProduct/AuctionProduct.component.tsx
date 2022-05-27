import classNames from 'classnames';
import React from 'react';
import ItemCard from '../../components/ItemCard';
import { mockData } from '../../mockData';
import { Asset } from '../../models/Asset';

import './AuctionProduct.style.scss';

type AuctionProductProps = {
  className?: string;
  itemAsset?: Asset;
};

const AuctionProduct: React.FC<AuctionProductProps> = (props) => {
  const { className, itemAsset = mockData[0] } = props;

  const classes = classNames('sy-auction-product', className);
  return (
    <div className={classes}>
      <div className="sy-auction-product__first-column">
        <p className="sy-auction-product__first-column__title">Title</p>
        <p className="sy-auction-product__first-column__status">
          Status: <span>{itemAsset.status}</span>
        </p>
        <p className="sy-auction-product__first-column__body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris
        </p>
      </div>
      <div className="sy-auction-product__second-column">
        <ItemCard itemAsset={itemAsset} isStart={false} />;
      </div>
      <div className="sy-auction-product__third-column">
        <p>STARTING PRICE</p>
      </div>
    </div>
  );
};

export default AuctionProduct;
