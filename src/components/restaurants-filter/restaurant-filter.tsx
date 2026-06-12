import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { Input } from '@/components/input';
import {
  mealTypes,
  foodTypes,
  restaurantStyles,
  paymentMethods,
  voucherAll,
  voucherTypes,
  defaultMinPrice,
  defaultMaxPrice,
} from '@/constants/filterConstants';
import {
  defaultFilters,
  RestaurantFilters,
  useFilterStore,
} from '@/store/restaurant-filter-store';

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity
          key={star}
          onPress={() => onChange(star === value ? 0 : star)}
        >
          <Ionicons
            name={star <= value ? 'star' : 'star-outline'}
            size={28}
            color={star <= value ? '#FF6B35' : '#D1D5DB'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function CheckboxList({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <View style={styles.checkboxList}>
      {options.map(option => {
        const isChecked = selected.includes(option);
        return (
          <TouchableOpacity
            key={option}
            style={styles.checkboxRow}
            onPress={() => onToggle(option)}
          >
            <View
              style={[styles.checkbox, isChecked && styles.checkboxChecked]}
            >
              {isChecked && (
                <Ionicons name="checkmark" size={13} color="white" />
              )}
            </View>
            <Text
              style={[
                styles.checkboxLabel,
                isChecked && styles.checkboxLabelChecked,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function VoucherSubFilter({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (updated: string[]) => void;
}) {
  const isAllSelected = selected.length === voucherTypes.length;

  const handleToggle = (option: string) => {
    if (option === voucherAll) {
      onChange(isAllSelected ? [] : [...voucherTypes]);
      return;
    }

    const updated = selected.includes(option)
      ? selected.filter(v => v !== option)
      : [...selected, option];
    onChange(updated);
  };

  return (
    <View style={styles.voucherContainer}>
      {[voucherAll, ...voucherTypes].map(option => {
        const isChecked =
          option === voucherAll ? isAllSelected : selected.includes(option);
        return (
          <TouchableOpacity
            key={option}
            style={styles.checkboxRow}
            onPress={() => handleToggle(option)}
          >
            <View
              style={[styles.checkbox, isChecked && styles.checkboxChecked]}
            >
              {isChecked && (
                <Ionicons name="checkmark" size={13} color="white" />
              )}
            </View>
            <Text
              style={[
                styles.checkboxLabel,
                isChecked && styles.checkboxLabelChecked,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.accordion}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setIsOpen(prev => !prev)}
      >
        <Text style={styles.accordionTitle}>{title}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#FF8344"
        />
      </TouchableOpacity>
      {isOpen && children}
    </View>
  );
}

export const RestaurantFilter = () => {
  const { isFilterOpen, closeFilter, setFilters, clearFilters, filters } =
    useFilterStore();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['55%', '92%'], []);
  const [local, setLocal] = useState<RestaurantFilters>(filters);

  const [minInput, setMinInput] = useState(filters.minPrice);
  const [maxInput, setMaxInput] = useState(filters.maxPrice);

  const formatCurrency = (value: number) => {
    if (!value) return '';
    return `R$ ${value}`;
  };

  const handleChangePrice = (value: string, type: 'min' | 'max') => {
    const cleanValue = value.replace(/[R$\s]/g, '');
    const numericValue = parseInt(cleanValue, 10);
    if (type === 'min') {
      setMinInput(isNaN(numericValue) ? 0 : numericValue);
      if (
        !isNaN(numericValue) &&
        numericValue >= defaultMinPrice &&
        numericValue <= local.maxPrice
      ) {
        const rounded = Math.round(numericValue / 10) * 10;
        setLocal(prev => ({ ...prev, minPrice: rounded }));
      }
    } else {
      setMaxInput(isNaN(numericValue) ? 0 : numericValue);
      if (
        !isNaN(numericValue) &&
        numericValue <= defaultMaxPrice &&
        numericValue >= local.minPrice
      ) {
        const rounded = Math.round(numericValue / 10) * 10;
        setLocal(prev => ({ ...prev, maxPrice: rounded }));
      }
    }
  };

  const handleBlur = (type: 'min' | 'max') => {
    if (type === 'min') {
      if (isNaN(minInput) || minInput < defaultMinPrice) {
        setMinInput(defaultMinPrice);
        setLocal(prev => ({ ...prev, minPrice: defaultMinPrice }));
      } else if (minInput > local.maxPrice) {
        setMinInput(local.maxPrice);
        setLocal(prev => ({ ...prev, minPrice: local.maxPrice }));
      } else {
        const rounded = Math.round(minInput / 10) * 10;
        setMinInput(rounded);
        setLocal(prev => ({ ...prev, minPrice: rounded }));
      }
    } else {
      if (isNaN(maxInput) || maxInput > defaultMaxPrice) {
        setMaxInput(defaultMaxPrice);
        setLocal(prev => ({ ...prev, maxPrice: defaultMaxPrice }));
      } else if (maxInput < local.minPrice) {
        setMaxInput(local.minPrice);
        setLocal(prev => ({ ...prev, maxPrice: local.minPrice }));
      } else {
        const rounded = Math.round(maxInput / 10) * 10;
        setMaxInput(rounded);
        setLocal(prev => ({ ...prev, maxPrice: rounded }));
      }
    }
  };

  useEffect(() => {
    if (isFilterOpen) {
      setLocal(filters);
      setMinInput(filters.minPrice);
      setMaxInput(filters.maxPrice);
      sheetRef.current?.snapToIndex(0);
    } else {
      sheetRef.current?.close();
    }
  }, [isFilterOpen]);

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        closeFilter();
      }
    },
    [closeFilter],
  );

  function toggleItem(field: keyof RestaurantFilters, value: string) {
    const current = local[field] as string[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setLocal(prev => ({ ...prev, [field]: updated }));
  }

  function handlePaymentToggle(option: string) {
    const isAdding = !local.paymentMethods.includes(option);
    if (option === 'Vale-refeição') {
      setLocal(prev => ({
        ...prev,
        paymentMethods: isAdding
          ? [...prev.paymentMethods, option]
          : prev.paymentMethods.filter(v => v !== option),
        voucherTypes: isAdding ? [...voucherTypes] : [],
      }));
    } else {
      toggleItem('paymentMethods', option);
    }
  }

  function handleApply() {
    setFilters(local);
    closeFilter();
  }

  function handleReset() {
    setLocal(defaultFilters);
    setMinInput(Number(defaultFilters.minPrice));
    setMaxInput(Number(defaultFilters.maxPrice));
    clearFilters();
  }

  const activeCount = [
    local.minRating > 0,
    local.foodTypes.length > 0,
    local.restaurantStyles.length > 0,
    local.mealTypes.length > 0,
    local.paymentMethods.length > 0,
    local.voucherTypes.length > 0,
    local.minPrice !== defaultMinPrice || local.maxPrice !== defaultMaxPrice,
  ].filter(Boolean).length;

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.sheetBackground}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AccordionSection title="Ranking">
          <StarRating
            value={local.minRating}
            onChange={v => setLocal(prev => ({ ...prev, minRating: v }))}
          />
        </AccordionSection>

        <AccordionSection title="Faixa de preço">
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Gasto por pessoa</Text>
            <MultiSlider
              values={[local.minPrice, local.maxPrice]}
              min={defaultMinPrice}
              max={defaultMaxPrice}
              step={10}
              selectedStyle={{ backgroundColor: '#FF6B35' }}
              unselectedStyle={{ backgroundColor: '#E5E7EB' }}
              markerStyle={styles.sliderMarker}
              onValuesChange={([min, max]) => {
                setLocal(prev => ({ ...prev, minPrice: min, maxPrice: max }));
                setMinInput(min);
                setMaxInput(max);
              }}
              containerStyle={{ alignSelf: 'center' }}
            />
            <View className="w-[250px] flex flex-row justify-between">
              <Input.Root>
                <Input.Field
                  value={formatCurrency(minInput)}
                  onChangeText={value => handleChangePrice(value, 'min')}
                  onBlur={() => handleBlur('min')}
                  keyboardType="numeric"
                  className="w-[90px] h-[45px] border border-[#8B8B8B] bg-transparent"
                />
                <Input.Label text="Mínimo" className="mb-1 text-[#00141C]" />
              </Input.Root>

              <Input.Root>
                <Input.Field
                  value={formatCurrency(maxInput)}
                  onChangeText={value => handleChangePrice(value, 'max')}
                  onBlur={() => handleBlur('max')}
                  keyboardType="numeric"
                  className="w-[90px] h-[45px] border rounded-xl border-[#8B8B8B] bg-transparent"
                />
                <Input.Label text="Máximo" className="mb-1 text-[#00141C]" />
              </Input.Root>
            </View>
          </View>
        </AccordionSection>
        <AccordionSection title="Tipo de comida">
          <CheckboxList
            options={foodTypes}
            selected={local.foodTypes}
            onToggle={v => toggleItem('foodTypes', v)}
          />
        </AccordionSection>

        <AccordionSection title="Estilo de restaurante">
          <CheckboxList
            options={restaurantStyles}
            selected={local.restaurantStyles}
            onToggle={v => toggleItem('restaurantStyles', v)}
          />
        </AccordionSection>

        <AccordionSection title="Tipo de refeição">
          <CheckboxList
            options={mealTypes}
            selected={local.mealTypes}
            onToggle={v => toggleItem('mealTypes', v)}
          />
        </AccordionSection>

        <AccordionSection title="Formas de pagamento">
          <CheckboxList
            options={paymentMethods}
            selected={local.paymentMethods}
            onToggle={handlePaymentToggle}
          />
          {local.paymentMethods.includes('Vale-refeição') && (
            <VoucherSubFilter
              selected={local.voucherTypes}
              onChange={updated =>
                setLocal(prev => ({ ...prev, voucherTypes: updated }))
              }
            />
          )}
        </AccordionSection>
        <View style={{ height: 100 }} />
      </BottomSheetScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetText}>Resetar Filtros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
          <Text style={styles.applyText}>
            Aplicar Filtros{activeCount > 0 ? ` (${activeCount})` : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#FDF6F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    backgroundColor: '#D1D5DB',
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  accordion: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  accordionTitle: {
    color: '#1F2937',
    fontSize: 16,
    fontFamily: 'PoppinsMedium',
  },
  starRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  checkboxList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'PoppinsRegular',
  },
  checkboxLabelChecked: {
    color: '#FF6B35',
  },
  // Slider
  sliderContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'PoppinsRegular',
    marginBottom: 4,
  },
  sliderMarker: {
    backgroundColor: '#FF6B35',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceTag: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  priceText: {
    color: '#003247',
    fontFamily: 'PoppinsMedium',
    fontSize: 14,
  },
  voucherContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 2,
    paddingLeft: 12,
    paddingVertical: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#FF6B35',
    gap: 12,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FDF6F5',
  },
  resetBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  resetText: {
    color: '#FF6B35',
    fontFamily: 'PoppinsMedium',
    fontSize: 16,
  },
  applyBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
  },
  applyText: {
    color: 'white',
    fontFamily: 'PoppinsMedium',
    fontSize: 16,
  },
});
