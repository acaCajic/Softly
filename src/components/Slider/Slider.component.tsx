import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import NextSlideBtn from '../../icons/NextSlideBtn';
import PrevSlideBtn from '../../icons/PrevSlideBtn';
import Button from '../UI/Button';

import './Slider.styles.scss';

type SliderProps = {
  activeLength?: number;
  className?: string;
};

const getTranslateXValue = (
  activeIndex: number,
  currentIndex: number,
  slidesLength: number,
  activeLength: number,
) => {
  if (activeIndex === currentIndex) return 0;

  if (
    currentIndex === activeIndex + 1 ||
    (slidesLength - 1 === activeIndex && currentIndex === 0)
  )
    return 5 / activeLength;

  return ((currentIndex - activeIndex) * 100) / activeLength;
};

const Slider: React.FC<SliderProps> = (props) => {
  const { className, activeLength = 1 } = props;

  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [dataSlider, setDataSlider] = useState<Array<string>>([
    'https://internship-api.s3.eu-central-1.amazonaws.com/plft114xnl1z10ki2_philly.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4K6RFZE2TXLLN64M%2F20220608%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220608T110644Z&X-Amz-Expires=86400&X-Amz-Signature=6abb7ab86a78026c4773bc6be41eaa82ba8693de7adae2b1fd782faa6a9d2a9f&X-Amz-SignedHeaders=host',
    './assets/images/Rectangle14.png',
    'https://internship-api.s3.eu-central-1.amazonaws.com/plft114xnl1z10ki2_philly.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4K6RFZE2TXLLN64M%2F20220608%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220608T110644Z&X-Amz-Expires=86400&X-Amz-Signature=6abb7ab86a78026c4773bc6be41eaa82ba8693de7adae2b1fd782faa6a9d2a9f&X-Amz-SignedHeaders=host',
    './assets/images/Rectangle14.png',
    './assets/images/Rectangle22.png',
  ]);

  const nextSlide = useCallback(() => {
    setSlideIndex(Math.min(slideIndex + 1, dataSlider.length - 1));
    if (slideIndex === dataSlider.length - 1) setSlideIndex(0);
    console.log(slideIndex);
    /*if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length - 1) {
      setSlideIndex(0);
    }*/
  }, [dataSlider.length, slideIndex]);

  const prevSlide = useCallback(() => {
    setSlideIndex(Math.max(slideIndex - 1, 0));
    if (!slideIndex) setSlideIndex(dataSlider.length - 1);
    console.log(slideIndex);
    /*if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 0) {
      setSlideIndex(dataSlider.length - 1);
    }*/
  }, [dataSlider.length, slideIndex]);

  const classes = classNames('slider', className);

  return (
    <div className={classes}>
      {dataSlider.map((item, index) => {
        return (
          <div
            className={classNames('common-slide', {
              'slide--active':
                slideIndex === index ||
                slideIndex + 1 === index ||
                slideIndex + 2 === index,
              slide: slideIndex !== index,
            })}
            style={{
              transform: `translate3d(${slideIndex * 33.3}vw,0,0)`,
              // transform: `translate3d(${getTranslateXValue(
              //   slideIndex,
              //   index,
              //   dataSlider.length,
              //   activeLength,
              // )}vw, 0, 0)`,
              width: `${100 / activeLength}vw`,
            }}
            key={index}
          >
            {(slideIndex === index ||
              slideIndex + 1 === index ||
              slideIndex + 2 === index) && (
              <img
                // style={{ transform: `translate3d(${slideIndex * 100}%,0,0)` }}
                // style={{ transform: `translate3d(${0}%,0,0)` }}
                // className={classNames('slider__image', {
                //   'slider__image--active': index === slideIndex,
                // })}
                src={item}
                alt="a"
                className="image"
                style={{ width: `${100 / activeLength}vw` }}
              />
            )}
          </div>
        );
      })}
      <Button
        icon={<PrevSlideBtn />}
        className="slider__prev-slide"
        onClick={prevSlide}
      ></Button>
      <Button
        icon={<NextSlideBtn />}
        className="slider__next-slide"
        onClick={nextSlide}
      ></Button>
    </div>
  );
};

export default Slider;
