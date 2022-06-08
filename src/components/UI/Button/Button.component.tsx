import React from 'react';
import classNames from 'classnames';

import './Button.style.scss';

type ButtonProps = {
  children?: React.ReactNode;
  styleType?: 'primary' | 'secondary';
  variant?: 'icon' | 'outline' | 'solid' | 'link';
  icon?: React.ReactNode;
  positionIcon?: 'icon-left' | 'icon-right' | 'icon-down';
  showButton?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    styleType = 'primary',
    variant,
    icon,
    positionIcon = 'icon-right',
    className,
    showButton = true,
    ...rest
  } = props;

  const classes = classNames(
    'btn-style',
    `btn-style--${styleType}`,
    `btn-style--${variant}`,
    className,
    {
      'btn-style--icon-left': positionIcon === 'icon-left',
      'btn-style--icon-right': positionIcon === 'icon-right',
      'btn-style--icon-down': positionIcon === 'icon-down',
      'btn-style--show': !showButton,
    },
  );

  return (
    <button {...rest} className={classes}>
      {icon}
      {props.children}
    </button>
  );
};

export default Button;
