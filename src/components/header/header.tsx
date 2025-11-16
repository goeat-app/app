import { View, Image } from 'react-native';

export const Header = () => {
  return (
    <View className="w-full items-left justify-left">
      <Image
        resizeMode="contain"
        source={require('@/assets/images/logotipo.png')}
        style={{
          width: 80,
          height: 80,
        }}
      />
    </View>
  );
};
