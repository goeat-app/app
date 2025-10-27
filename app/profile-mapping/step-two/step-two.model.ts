import { useState } from "react";

export const useStepTwoModel = () => {
  const progress = 0.66;
  const MAX_COUNT = 3;
  const [selectedEnvironment, setSelectedEnvironment] = useState<string[]>([]);

  const handleSelectEnvironment = (id: string) => {
    // TODO: Lógica para selecionar o ambiente
    if (selectedEnvironment.includes(id)) {
      setSelectedEnvironment(selectedEnvironment.filter(i => i !== id));
      return;
    }

    if (selectedEnvironment.length < MAX_COUNT) {
      setSelectedEnvironment([...selectedEnvironment, id]);
    }
  }

  return {
    progress,
    selectedEnvironment,
    handleSelectEnvironment
  }
}