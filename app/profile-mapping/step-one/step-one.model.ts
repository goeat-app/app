import { foodItems } from '@/lib/mocks/step-one-mock';
import { useState } from "react";

export const useStepOneModel = () => {
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const progress = 0.33;
  const MAX_COUNT = 3;

  const handleSelect = (item: number) => {
    if (selectedItem.includes(item)) {
      setSelectedItem(selectedItem.filter(i => i !== item));

    }

    if (selectedItem.length <= MAX_COUNT -1) {
      setSelectedItem([...selectedItem, item]);
    }
  }

  return {
    selectedItem,
    progress,
    foodItems,
    handleSelect
  }
}