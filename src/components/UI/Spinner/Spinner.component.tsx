import classNames from 'classnames';
import React from 'react';

import './Spinner.style.scss';

type SpinnerProps = {
  color?: string;
  size: 'small' | 'medium' | 'large';
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = (props) => {
  const { className, size = 'small' } = props;

  const classes = classNames('spinner', className, {
    'spinner--small': size === 'small',
    'spinner--medium': size === 'medium',
    'spinner--large': size === 'large',
  });

  return <span className={classes} />;
};

export default Spinner;
