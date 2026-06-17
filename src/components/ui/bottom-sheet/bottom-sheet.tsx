import { ReactNode, useRef } from 'react';

import GorhomBottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

export interface RootProps {
  children: ReactNode;
}

export default function BottomSheet({ children }: RootProps) {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);

  return (
    <GorhomBottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={['20%', '45%', '90%']}
      handleIndicatorStyle={{
        backgroundColor: '#e5e7eb',
        width: 48,
        borderRadius: 42,
      }}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
      >
        {children}
      </BottomSheetScrollView>
    </GorhomBottomSheet>
  );
}
