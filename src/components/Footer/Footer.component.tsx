import classNames from 'classnames';
import React from 'react';

import './Footer.style.scss';
import './Footer.responsive.style.scss';

type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = (props) => {
  const { className } = props;

  const classes = classNames('footer', className);

  const socialNetworks = [
    { title: 'Facebook' },
    { title: 'Linkedln' },
    { title: 'Twitter' },
    { title: 'Instagram' },
    { title: 'Youtube' },
  ];

  const legalItems = [
    { title: 'Privacy Policy' },
    { title: 'Terms of Use' },
    { title: 'Cookies' },
  ];

  return (
    <div className={classes}>
      <div className="footer__first-column">
        <div className="footer__first-column__softly">
          <p className="footer__first-column__softly-p">Softly Pty Ltd. </p>
          <p>ABN: 88 888 888 888</p>
        </div>
        <div className="footer__first-column__contact">
          <p className="footer__first-column__contact-p">Contact Us</p>
          <p>Mon - Fri 9:00am - 5:00pm </p>
          <p className="footer__first-column__contact-p-88">+88 888 888 888</p>
        </div>
      </div>
      <div className="footer__second-column">
        <p className="footer__second-column__follow-us">Follow Us</p>
        <ul className="footer__second-column__social-network-ul">
          {socialNetworks.map((item, index) => {
            return (
              <li
                key={index}
                className="footer__second-column__social-network-li"
              >
                <a href="/">{item.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="footer__third-column">
        <p className="footer__third-column__legal">Legal</p>
        <ul className="footer__third-column__legal-items">
          {legalItems.map((item, index) => {
            return (
              <li key={index} className="footer__third-column__legal-items-li">
                <a href="/">{item.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
