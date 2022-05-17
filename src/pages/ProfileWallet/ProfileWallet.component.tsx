import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';

import './ProfileWallet.style.scss';

type ProfileWalletProps = {
  className?: string;
};

const ProfileWallet: React.FC<ProfileWalletProps> = (props) => {
  const { className } = props;

  const classes = classNames('sy-profile-wallet', className);

  const pageLinks = [
    { title: 'Wallet', to: '/wallet' },
    { title: 'My Current Bids', to: '/currentbids' },
    { title: 'My history', to: '/history' },
    { title: 'Account Settings', to: 'accountsettings' },
  ];

  return (
    <div className={classes}>
      <NavBar />
      <div className="sy-profile-wallet__container">
        <div className="sy-profile-wallet__side-menu">
          <div className="sy-profile-wallet__side-menu__picture-name">
            <div className="sy-profile-wallet__side-menu__picture-name__picture"></div>
            <p className="sy-profile-wallet__side-menu__picture-name__name">
              NAME NAME
            </p>
          </div>
          <div className="sy-profile-wallet__side-menu__page-links">
            {pageLinks.map((item, index) => {
              return (
                <Link
                  to={item.to}
                  key={index}
                  className="sy-profile-wallet__side-menu__page-links__link"
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="sy-profile-wallet__rest-container">
          <div className="sy-profile-wallet__rest-container__wallet-assets">
            <p className="sy-profile-wallet__rest-container__wallet-assets__label">
              Wallet
            </p>
            <div className="sy-profile-wallet__rest-container__wallet-assets__metamask"></div>
            <div className="sy-profile-wallet__rest-container__wallet-assets__addwallet"></div>

            <p className="sy-profile-wallet__rest-container__wallet-assets__assets">
              ASSETS
            </p>
          </div>
          <div className="sy-profile-wallet__rest-container__balance-transaction"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWallet;
