import { useState } from 'react';

export const useStepThreeModel = () => {
  const [range, setRange] = useState([20, 300]);
  const [minInput, setMinInput] = useState('20');
  const [maxInput, setMaxInput] = useState('300');

  const handleChangePrice = (value: string, type: 'min' | 'max') => {
    const cleanValue = value.replace(/\D/g, '');

    if (type === 'min') {
      setMinInput(cleanValue);
      const numericValue = parseInt(cleanValue, 10);

      if (
        !isNaN(numericValue) &&
        numericValue >= 20 &&
        numericValue <= range[1]
      ) {
        const roundedValue = Math.round(numericValue / 10) * 10;
        setRange([roundedValue, range[1]]);
      } else if (cleanValue === '') {
        setRange([20, range[1]]);
      }
    } else {
      setMaxInput(cleanValue);
      const numericValue = parseInt(cleanValue, 10);

      if (
        !isNaN(numericValue) &&
        numericValue <= 300 &&
        numericValue >= range[0]
      ) {
        const roundedValue = Math.round(numericValue / 10) * 10;
        setRange([range[0], roundedValue]);
      } else if (cleanValue === '') {
        setRange([range[0], 300]);
      }
    }
  };

  const formatCurrency = (value: string) => {
    if (!value) return '';
    return `R$ ${value}`;
  };

  const handleBlur = (type: 'min' | 'max') => {
    if (type === 'min') {
      const numericValue = parseInt(minInput, 10);
      if (isNaN(numericValue) || numericValue < 20) {
        setMinInput('20');
        setRange([20, range[1]]);
      } else if (numericValue > range[1]) {
        setMinInput(range[1].toString());
        setRange([range[1], range[1]]);
      } else {
        const roundedValue = Math.round(numericValue / 10) * 10;
        setMinInput(roundedValue.toString());
        setRange([roundedValue, range[1]]);
      }
    } else {
      const numericValue = parseInt(maxInput, 10);
      if (isNaN(numericValue) || numericValue > 300) {
        setMaxInput('300');
        setRange([range[0], 300]);
      } else if (numericValue < range[0]) {
        setMaxInput(range[0].toString());
        setRange([range[0], range[0]]);
      } else {
        const roundedValue = Math.round(numericValue / 10) * 10;
        setMaxInput(roundedValue.toString());
        setRange([range[0], roundedValue]);
      }
    }
  };

  const handleSliderChange = (values: number[]) => {
    setRange(values);
    setMinInput(values[0].toString());
    setMaxInput(values[1].toString());
  };

  return {
    range,
    minInput,
    maxInput,
    handleChangePrice,
    formatCurrency,
    handleBlur,
    handleSliderChange,
  };
};
