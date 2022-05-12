import classNames from 'classnames';
import React, { useCallback } from 'react';
import Button from '../../components/UI/Button';
import PinInput from '../../components/UI/PinInput';

import './Verify.style.scss';

type VerifyProps = {
  className?: string;
};

const Verify: React.FC<VerifyProps> = (props) => {
  const { className } = props;

  const classes = classNames('verify', className);

  const verifyPinNumber = useCallback((value: number) => {
    console.log(value);
  }, []);
  return (
    <form className={classes}>
      <img src="assets/images/logo.png" alt="logo" className="verify__logo" />
      <label className="verify__label-verify">Verify</label>
      <p className="verify__text-p">
        You should have recieved an email verifying your account, please enter
        the code below. Didn’t recieve it?{' '}
      </p>
      <div className="verify__resend-btn">
        <Button variant="link">Resend code.</Button>
      </div>

      <PinInput
        className="verify__inputs"
        numOfPins={5}
        onChange={verifyPinNumber}
      ></PinInput>

      <div className="verify__div-btn">
        <Button children="GO" styleType="primary" variant="outline" />
      </div>
    </form>
  );
};

export default Verify;
