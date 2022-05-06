import React from 'react';
import { Link } from 'react-router-dom';

import './Verify.style.scss';

type VerifyProps = {
  className?: string;
};

const Verify: React.FC<VerifyProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <form className="verify">
      <img src="assets/images/logo.png" className="verify__logo" />
      <label className="verify__label-verify">Verify</label>
      <p>
        You should have recieved an email verifying your account, please enter
        the code below. Didn’t recieve it?{' '}
      </p>
      <Link to="">Resend code.</Link>
    </form>
  );
};

export default Verify;
