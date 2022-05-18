import React from 'react';
import classNames from 'classnames';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { mockData } from '../../mockData';
import ItemCard from '../../components/ItemCard';
import Button from '../../components/UI/Button';
import TriangleDown from '../../icons/TriangleDown.icon';
import { MATHC_MAP_NAME, useMathcMedia } from '../../hooks/useMathMedia';

import './AuctionGallery.style.scss';
import './AuctionGallery.responsive.style.scss';

type AuctionGalleryProps = {
  className?: 'string';
};

const AuctionGallery: React.FC<AuctionGalleryProps> = (props) => {
  const { className } = props;

  const classes = classNames('sy-auction-gallery', className);

  const isMobile = useMathcMedia(MATHC_MAP_NAME.IS_MOBILE);

  console.log(isMobile);

  return (
    <div className={classes}>
      <NavBar />
      <div className="sy-auction-gallery__container">
        <div className="sy-auction-gallery__live-auctions">
          <div className="sy-auction-gallery__live-auctions__header">
            <p className="sy-auction-gallery__live-auctions__header__p-live-auctions">
              {`${isMobile ? 'Live' : 'Live Auctions'}`}
            </p>
            <p className="sy-auction-gallery__live-auctions__header__p-upcoming">
              TO UPCOMING
            </p>

            <Button
              icon={<TriangleDown />}
              className="sy-auction-gallery__live-auctions__header__btn-sort"
            >
              Sort By
            </Button>
          </div>
          <div className="sy-auction-gallery__live-auctions__cards">
            {mockData.map((item, index) => {
              return <ItemCard key={index} />;
            })}
            {mockData.map((item, index) => {
              return <ItemCard key={index} />;
            })}
          </div>
          <Button
            icon={<TriangleDown />}
            positionIcon="icon-down"
            className="sy-auction-gallery__live-auctions__load-more"
          >
            Load More
          </Button>
        </div>

        <div className="sy-auction-gallery__upcoming">
          <div className="sy-auction-gallery__live-auctions__header">
            <p className="sy-auction-gallery__live-auctions__header__p-live-auctions">
              {`${isMobile ? 'Upcoming' : 'Upcoming Auctions'}`}
            </p>
            <p className="sy-auction-gallery__live-auctions__header__p-upcoming">
              TO LIVE
            </p>

            <Button
              icon={<TriangleDown />}
              className="sy-auction-gallery__live-auctions__header__btn-sort"
            >
              Sort By
            </Button>
          </div>
          <div className="sy-auction-gallery__live-auctions__cards">
            {mockData.map((item, index) => {
              return <ItemCard key={index} />;
            })}
            {mockData.map((item, index) => {
              return <ItemCard key={index} />;
            })}
          </div>
          <Button
            icon={<TriangleDown />}
            positionIcon="icon-down"
            className="sy-auction-gallery__live-auctions__load-more"
          >
            Load More
          </Button>
        </div>

        <div className="sy-auction-gallery__paragraph">
          <ItemCard className="sy-auction-gallery__paragraph__picture" />
          <div className="sy-auction-gallery__paragraph__text-btn"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuctionGallery;
