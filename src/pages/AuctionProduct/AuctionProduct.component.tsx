import classNames from 'classnames';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Button from '../../components/UI/Button';
import InputField from '../../components/Fields/InputField';
import Field from '../../components/FormWrapper/components/Field';
import ItemCard from '../../components/ItemCard';
import { mockData } from '../../mockData';
import { Asset } from '../../models/Asset';
import {
  composeValidators,
  required,
  validateEmail,
} from '../../services/validators';
import api from '../../api';
import GeneralContext from '../../Providers/GeneralProvider/General.context';
import FormWrapper from '../../components/FormWrapper';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner';

import './AuctionProduct.style.scss';
import './AuctionProduct.responsive.styles.scss';

type AuctionProductProps = {
  className?: string;
  itemAsset?: Asset;
};

type FormValue = {
  price: number;
};

const AuctionProduct: React.FC<AuctionProductProps> = (props) => {
  const { className, itemAsset = mockData[0] } = props;

  const contextValues = useContext(GeneralContext);
  const { user } = contextValues;
  // console.log(contextValues, 'in auction product');

  const [asset, setAsset] = useState<Asset>();
  const [loading, setLoading] = useState<Boolean>();
  const { auctionId } = useParams<{ auctionId: string }>();
  useEffect(() => {
    const loadItemAsset = async () => {
      try {
        setLoading(true);
        const { data: assetItem } = await api.assets.getAsset(auctionId);
        setAsset(assetItem);
        console.log(assetItem);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    loadItemAsset();
    // const { assetItem }: any = await api.assets.getAsset(auctionId);
  }, [auctionId]);

  const onSubmit = async (values: FormValue) => {
    // console.log('here submit', user, itemAsset.id, values.price);
    try {
      const { price } = values;
      const { data } = await api.assets.setBidAssets(
        user.id,
        asset.id,
        values.price,
      );

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  console.log(auctionId);
  const classes = classNames('sy-auction-product', className);
  return (
    <div className={classes}>
      {/* <p className="sy-auction-product__first-column__title">Title</p> */}
      <div className="sy-auction-product__first-column">
        <p className="sy-auction-product__first-column__title">Title</p>
        <p className="sy-auction-product__first-column__status">
          Status: <span>{asset?.status}</span>
        </p>
        <p className="sy-auction-product__first-column__body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris
        </p>
      </div>
      <div className="sy-auction-product__second-column">
        {asset && (
          <ItemCard
            itemAsset={asset}
            isStart={false}
            showButton={false}
            dataInRow={true}
          />
        )}
      </div>
      <div className="sy-auction-product__third-column">
        <p className="sy-auction-product__third-column__starting-price">
          STARTING PRICE
        </p>
        <p className="sy-auction-product__third-column__starting-price__value">
          {itemAsset.startBid}
        </p>
        <p className="sy-auction-product__third-column__current-bid">
          CURRENT BID
        </p>
        <p className="sy-auction-product__third-column__current-bid__value">
          {itemAsset.currentBid}
        </p>
        <p className="sy-auction-product__third-column__time-elapsed">
          TIME ELAPSED
        </p>
        <p className="sy-auction-product__third-column__time-elapsed__value">
          0 days | 0 hours | 00 minutes
        </p>

        <FormWrapper<FormValue>
          onSubmit={onSubmit}
          className="sy-auction-product__third-column__bid"
        >
          <Field
            name="price"
            component={InputField}
            type="text"
            className="sy-auction-product__third-column__bid__input"
            labelName="Input Bid Amount"
            placeholder="$$$"
            validate={required('This field is required')}
          />

          <Button
            variant="outline"
            styleType="primary"
            className="sy-auction-product__third-column__bid__btn"
            type="submit"
          >
            BID
          </Button>
        </FormWrapper>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default AuctionProduct;
