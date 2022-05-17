import classNames from 'classnames';
import React from 'react';

import './ButtonMenu.style.scss';

type ButtonMenuProps = {
  className?: string;
  btnOpen?: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ButtonMenu: React.FC<ButtonMenuProps> = (props) => {
  const { className, btnOpen, ...rest } = props;

  const classes = classNames('button-menu', className, {
    'button-menu--open': btnOpen,
  });

  return (
    <div {...rest} className={classes}>
      {Array.from({ length: 3 }).map((_, index) => (
        <span data-index={index} key={index} className="button-menu__line" />
      ))}
    </div>
  );
};

export default ButtonMenu;
