import React from 'react';
import classNames from 'classnames';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import './AuctionGallery.style.scss';
import './AuctionGallery.responsive.style.scss';
import { mockData } from '../../mockData';
import ItemCard from '../../components/ItemCard';

type AuctionGalleryProps = {
  className?: 'string';
};

const AuctionGallery: React.FC<AuctionGalleryProps> = (props) => {
  const { className } = props;
  const classes = classNames('sy-auction-gallery', className);
  return (
    <div className={classes}>
      <NavBar />
      <div className="sy-auction-gallery__container">
        <div className="sy-auction-gallery__live-auctions">
          <div className="sy-auction-gallery__live-auctions__header">
            <p className="sy-auction-gallery__live-auctions__header__p-live-auctions">
              Live Auctions
            </p>
            <p className="sy-auction-gallery__live-auctions__header__p-upcoming">
              TO UPCOMING
            </p>
            <p>Sort By</p>
          </div>
          <div className="sy-auction-gallery__live-auctions__cards">
            {mockData.map((item, index) => {
              return <ItemCard />;
            })}
            {mockData.map((item, index) => {
              return <ItemCard />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuctionGallery;
