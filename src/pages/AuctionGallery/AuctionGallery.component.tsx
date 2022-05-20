import React, { useCallback, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { mockData } from '../../mockData';
import ItemCard from '../../components/ItemCard';
import Button from '../../components/UI/Button';
import TriangleDown from '../../icons/TriangleDown.icon';
import { MATHC_MAP_NAME, useMathcMedia } from '../../hooks/useMathMedia';
import { Asset } from '../../models/Asset';
import api from '../../api/';

import './AuctionGallery.style.scss';
import './AuctionGallery.responsive.style.scss';
import Spinner from '../../components/UI/Spinner';

type AuctionGalleryProps = {
  className?: 'string';
};

const AuctionGallery: React.FC<AuctionGalleryProps> = (props) => {
  const { className } = props;

  const classes = classNames('sy-auction-gallery', className);

  const [auctions, setAuctions] = useState<{
    liveAuctions: Array<Asset>;
    upcomingAuction: Array<Asset>;
  }>(null);

  const isMobile = useMathcMedia(MATHC_MAP_NAME.IS_MOBILE);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        setLoading(true);
        const { data } = await api.auctions.getGalleryAuctions();

        setAuctions((oldAuctions) => ({
          ...oldAuctions,
          liveAuctions: data.liveAssets,
          upcomingAuction: data.upcomingAssets,
        }));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (!auctions) loadAuctions();
  }, [auctions]);

  return (
    <div className={classes}>
      {loading && <Spinner />}
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
            {auctions?.liveAuctions.map((item, index) => {
              return <ItemCard key={index} pictureUrl={item.pictureUrl} />;
              // return (
              //   <img src={item.pictureUrl} alt="picture-item" key={index} />
              // );
            })}
            {/* {mockData.map((item, index) => {
              return <ItemCard key={index} />;
            })} */}
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
            {auctions.upcomingAuction.map((item, index) => {
              // return <label>{item.companyName}</label>;

              return <ItemCard key={index} />;
            })}
            {/* {mockData.map((item, index) => {
              return <ItemCard key={index} />;
            })} */}
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
          <img
            src="/assets/images/Rectangle14.png"
            alt="item-auctions"
            className="sy-auction-gallery__paragraph__picture"
          />
          <div className="sy-auction-gallery__paragraph__text-btn">
            <p className="sy-auction-gallery__paragraph__text-btn__title">
              Sell with Softly
            </p>
            <p className="sy-auction-gallery__paragraph__text-btn__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
            </p>
            <Button className="sy-auction-gallery__paragraph__text-btn__btn">
              START
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionGallery;
