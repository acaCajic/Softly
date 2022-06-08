import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import './PinInput.style.scss';

const allowedKeys = ['Backspace'] as Array<string>;

type PinInputProps = {
  className?: string;
  numOfPins?: number;
  onChange?: (value: number) => void;
};

const PinInput: React.FC<PinInputProps> = (props) => {
  const { numOfPins, className, onChange } = props;

  const classes = classNames('pin-input', className);

  const digitArray = Array.from({ length: numOfPins }) as Array<
    number | undefined
  >;

  const [numbers, setNumbers] = useState<Array<number>>(digitArray);

  const inputRef = useRef<HTMLInputElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const isVerificationReady = useMemo(
    () => numbers.every((num) => num !== undefined && !isNaN(num)),
    [numbers],
  );

  const [deletionActive, setDeletionActive] = useState<boolean>(false);

  const handleOnKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;

      if (!allowedKeys.includes(key)) return;

      setDeletionActive(true);
      setActiveIndex((oldIndex) => Math.max(0, oldIndex - 1));
    },
    [],
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const pinValue = parseInt(event.target.value);

      setNumbers((oldNumbers) => {
        return oldNumbers.map((num, index) => {
          if (deletionActive) {
            if (index === activeIndex + 1)
              return !isNaN(pinValue) ? pinValue : undefined;
            else return num;
          } else {
            if (index === activeIndex)
              return !isNaN(pinValue) ? pinValue : undefined;
            else return num;
          }
        });
      });

      if (!deletionActive)
        setActiveIndex((old) => Math.min(numOfPins - 1, old + 1));

      setDeletionActive(false);
    },
    [activeIndex, deletionActive, numOfPins],
  );
  useEffect(() => {
    if (!inputRef.current && (activeIndex < 0 || activeIndex > numOfPins))
      return;
    inputRef.current.focus();
  }, [activeIndex, numOfPins]);

  useEffect(() => {
    if (!isVerificationReady) return;
    onChange(parseInt(numbers.join('')));
  }, [isVerificationReady, numbers, onChange]);

  return (
    <div className={classes}>
      {digitArray.map((_, index) => {
        return (
          <input
            tabIndex={0}
            key={index}
            value={numbers[index] || ''}
            ref={activeIndex === index ? inputRef : null}
            type="text"
            min={0}
            max={9}
            maxLength={1}
            className="pin-input__one-input"
            onChange={handleInput}
            onKeyDown={handleOnKeydown}
          />
        );
      })}
    </div>
  );
};

export default PinInput;
