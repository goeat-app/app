import { useState } from 'react';

import { router } from 'expo-router';
import { createProfileMapping } from 'use-cases/profile-mapping/profile-mapping.use-case';

import { loadingWrapper } from '@/hooks/loading-wrapper';

export const useStepThreeModel = () => {
  const [range, setRange] = useState([20, 300]);
  const [minInput, setMinInput] = useState<number>(20);
  const [maxInput, setMaxInput] = useState<number>(300);

  const handleChangePrice = (value: string, type: 'min' | 'max') => {
    const cleanValue = value.replace(/[R$\s]/g, '');
    const numericValue = parseInt(cleanValue, 10);
    
    if (type === 'min') {
      setMinInput(isNaN(numericValue) ? 0 : numericValue);

      if (!isNaN(numericValue) && numericValue >= 20 && numericValue <= range[1]) {
        const roundedValue = Math.round(numericValue / 10) * 10;
        setRange([roundedValue, range[1]]);
      }
    } else {
      setMaxInput(isNaN(numericValue) ? 0 : numericValue);

      if (!isNaN(numericValue) && numericValue <= 300 && numericValue >= range[0]) {
        const roundedValue = Math.round(numericValue / 10) * 10;
        setRange([range[0], roundedValue]);
      }
    }
  };

  const formatCurrency = (value: number) => {
    if (!value) return '';
    return `R$ ${value}`;
  };

  const handleBlur = (type: 'min' | 'max') => {
    if (type === 'min') {
      if (isNaN(minInput) || minInput < 20) {
        setMinInput(20);
        setRange([20, range[1]]);
      } else if (minInput > range[1]) {
        setMinInput(range[1]);
        setRange([range[1], range[1]]);
      } else {
        const roundedValue = Math.round(minInput / 10) * 10;
        setMinInput(roundedValue);
        setRange([roundedValue, range[1]]);
      }
    } else {
      if (isNaN(maxInput) || maxInput > 300) {
        setMaxInput(300);
        setRange([range[0], 300]);
      } else if (maxInput < range[0]) {
        setMaxInput(range[0]);
        setRange([range[0], range[0]]);
      } else {
        const roundedValue = Math.round(maxInput / 10) * 10;
        setMaxInput(roundedValue);
        setRange([range[0], roundedValue]);
      }
    }
  };

  const handleSliderChange = (values: number[]) => {
    setRange(values);
    setMinInput(values[0]);
    setMaxInput(values[1]);
  };

  const createProfile = async () => {
    const priceRange = {
      minValue: minInput,
      maxValue: maxInput,
    };

    const result = await loadingWrapper(() => createProfileMapping(priceRange));

    console.log('result', result);

    if (result.success) {
      router.replace('/home/home');
    }
  };

  return {
    range,
    minInput,
    maxInput,
    handleChangePrice,
    formatCurrency,
    handleBlur,
    handleSliderChange,
    createProfile,
  };
};
