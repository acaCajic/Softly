import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import PinInput from '../../components/UI/PinInput';

import './Verify.style.scss';

type VerifyProps = {
  className?: string;
};

const Verify: React.FC<VerifyProps> = (props) => {
  const { className, ...rest } = props;

  const [verificationNumber, setVerifica] = useState<number>();

  const verifyPinNumber = useCallback((value: number) => {
    console.log(value);
  }, []);
  return (
    <form className="verify">
      <img src="assets/images/logo.png" className="verify__logo" />
      <label className="verify__label-verify">Verify</label>
      <p>
        You should have recieved an email verifying your account, please enter
        the code below. Didn’t recieve it?{' '}
      </p>
      <div className="verify__resend-btn">
        <Button variant="link">Resend code.</Button>
      </div>
      <div className="verify__inputs">
        <PinInput numOfPins={5} onChange={verifyPinNumber}></PinInput>
      </div>
      <div className="verify__div-btn">
        <Button children="GO" styleType="primary" variant="outline" />
      </div>
    </form>
  );
};

export default Verify;
