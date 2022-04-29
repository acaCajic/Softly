import React, { useCallback, useState } from 'react';
import Button from '../../components/UI/Button';
import CheckBox from '../../components/UI/CheckBox';
import Input from '../../components/UI/Input';
import ArrowIcon from '../../icons/Arrow.icon';
import './Catalog.style.scss';

const Catalog: React.FC = () => {
  const [valueInput, setValueInput] = useState('');

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setValueInput(event.target.value);
  }, []);

  return (
    <div className="catalog-style">
      <h2>Catalog</h2>
      <div className="catalog-style__buttons">
        <p>Button</p>

        <Button variant="solid">Solid</Button>
        <Button variant="outline">Primary</Button>
        <Button styleType="secondary">Secondary</Button>
        <Button
          className="catalogButtons"
          icon={<ArrowIcon />}
          positionIcon="icon-left"
          styleType="primary"
          variant="icon"
        >
          Icon
        </Button>
      </div>
      <div className="catalog-style__input">
        <p>Input</p>
        <Input
          type="text"
          value={valueInput}
          className="home-page__input"
          labelName="Password"
          placeholder="content"
          onChange={onChange}
        />
      </div>
      <div className="catalog-style__checkbox">
        <p>CheckBox</p>
        <CheckBox labelName="Rember me"></CheckBox>
      </div>
    </div>
  );
};

export default Catalog;
