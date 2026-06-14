import { ReactNode } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

export interface RootProps {
  children: ReactNode;
}

export default function BottomSheet({ children }: RootProps) {
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.45;

  return (
    <View
      style={{ height: BOTTOM_SHEET_HEIGHT }}
      className="absolute z-20 bottom-0 left-0 right-0 w-full bg-white rounded-t-[42px] border-t border-gray-100 pt-6"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 20,
        }}
      >
        <View className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></View>
        {children}
      </ScrollView>
    </View>
  );
}
