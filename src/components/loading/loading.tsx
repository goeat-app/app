import { useLoaderStore } from '@/store/loading';
import { View, Image } from 'react-native';

export default function Loading() {
  const isLoading = useLoaderStore(state => state.isLoading);

  if (!isLoading) return null;

  return (
    <View className="absolute top-0 left-0 w-full h-full bg-black/40 items-center justify-center z-[9999]">
      <Image
        source={require('@/assets/gif/loader.gif')}
        className="w-32 h-32"
        resizeMode="contain"
      />
    </View>
  );
}
