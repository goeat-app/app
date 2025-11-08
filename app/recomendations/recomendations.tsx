import {
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/input';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Button } from '@/components/button';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@/components/typography/typography';
import { MoneyIcon } from '@/components/money-icon/money-icon';
import { EnvironmentIcon } from '@/assets/icons/environment-icon';
import { LocationIcon } from '@/assets/icons/location-icon';
import { FavoriteIcon } from '@/assets/icons/favorite-icon';

export default function Recomendations() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <View className="flex-1 bg-[#FDF6F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F5" />
      <View
        className="flex-row items-center justify-between px-4 bg-[#FDF6F5]"
        style={{
          paddingTop: Platform.OS === 'ios' ? insets.top + 10 : 16,
          paddingBottom: 12,
          minHeight: Platform.OS === 'ios' ? 70 : 60,
        }}
      >
        <Button onPress={() => router.back()} className="p-2">
          <Ionicons name="chevron-back" size={32} color="#000000" />
        </Button>

        <Input.Root className="flex items-center justify-center">
          <Input.Field
            value={searchValue}
            onChangeText={setSearchValue}
            className="flex w-[260px] h-[45px] border border-[#AAAAAA] bg-white rounded-full text-[#AAAAAA]"
            placeholder="Pesquisar restaurantes..."
          >
            <Input.ContentLeft>
              <Button onPress={handleClearSearch}>
                <MaterialCommunityIcons
                  name="store-search"
                  size={22}
                  color="#AAAAAA"
                />
              </Button>
            </Input.ContentLeft>
            <Input.ContentRight className="flex flex-row gap-1 ">
              {searchValue.length > 0 && (
                <Button onPress={handleClearSearch}>
                  <Ionicons name="close-circle" size={22} color="#003247" />
                </Button>
              )}
            </Input.ContentRight>
          </Input.Field>
        </Input.Root>
      </View>

      <View></View>

      <View>{/*filtros */}</View>

      <View className="flex-1 items-center">
        <View className="w-[335px] h-[225px] rounded-s-2xl ">
          <View className="w-full h-[153px] gap-2">
            <ImageBackground
              className="w-full h-full flex items-end p-2"
              source={require('@/assets/images/photo-restaurant/restaurant-mock-1.png')}
            >
              <FavoriteIcon />
            </ImageBackground>

            <View className="flex flex-row items-center justify-between w-full h-[25px] ">
              <View className="w-[40%]">
                <Typography
                  type="h3"
                  text="French Toast"
                  className="font-poppins-semi-bold"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                />
              </View>
              <View>
                <MoneyIcon scale={3} />
              </View>

              <Button className="flex w-[80px] h-[25px] bg-[#FF6B35] rounded-[4px] items-center justify-center">
                <Typography
                  text="Ver mais"
                  type="h4"
                  className="font-poppins-medium text-xs text-white"
                />
              </Button>
            </View>
            <View className="gap-2">
              <View className="flex flex-row gap-2">
                <EnvironmentIcon width={24} height={24} />
                <Typography
                  text="Comemorações, animado, divertido."
                  type="span"
                  className="text-[#5F6368] text-base"
                />
              </View>
              <View className="flex flex-row gap-2">
                <LocationIcon width={10} height={13} />
                <Typography
                  text="2.1 km - Jardim Horta, Campinas"
                  type="span"
                  className="text-[#5F6368] text-base"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
