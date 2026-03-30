import { Typography } from '@/components/typography/typography';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import { usePhotoGallery } from './photo-gallery.model';

interface PhotoGalleryProps {
  /** Array de imagens (require ou { uri }) */
  photos: ImageSourcePropType[];
  /** Título exibido acima das thumbnails (padrão: "Fotos") */
  title?: string;
  /** Quantidade de thumbnails visíveis antes do "+N" (padrão: 3) */
  visibleCount?: number;
}

export const PhotoGallery = ({
  photos,
  title = 'Fotos',
  visibleCount = 3,
}: PhotoGalleryProps) => {
  const {
    photosVisible,
    SCREEN_WIDTH,
    selectedIndex,
    setSelectedIndex,
    currentIndex,
    setCurrentIndex,
    lightboxRef,
  } = usePhotoGallery({ photos, title, visibleCount });

  return (
    <View className="flex flex-col ">
      <Typography
        type="span"
        className="text-lg text-[#5E5959] font-poppins-medium"
        text={title}
      />

      <View className="flex flex-row w-full">
        <FlatList
          horizontal
          data={photosVisible}
          renderItem={({ item, index }) => {
            const isLastPhoto = index === visibleCount;
            const remaining = photos.length - visibleCount;

            if (isLastPhoto) {
              return (
                <Pressable className="relative mr-4">
                  <Image
                    source={item}
                    className="w-[75px] h-[55px] rounded-md"
                  />
                  <View className="absolute inset-0 rounded-md items-center justify-center bg-black/55">
                    <Typography
                      type="span"
                      className="text-white font-poppins-semi-bold text-center"
                      text={`+${remaining}`}
                    />
                  </View>
                </Pressable>
              );
            }

            return (
              <Pressable
                onPress={() => setSelectedIndex(index)}
                className="mr-4"
              >
                <Image source={item} className="w-[75px] h-[55px]" />
              </Pressable>
            );
          }}
        />
      </View>

      <Modal
        visible={selectedIndex !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedIndex(null)}
      >
        <View className="flex-1 bg-black/95">
          <View className="flex-row items-center justify-between px-6 pt-12 pb-2">
            <Text className="text-white text-base">
              {currentIndex + 1}/{photos.length}
            </Text>
            <Pressable onPress={() => setSelectedIndex(null)}>
              <Text className="text-white text-2xl">✕</Text>
            </Pressable>
          </View>

          <FlatList
            ref={lightboxRef}
            data={photos}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={selectedIndex ?? 0}
            getItemLayout={(_, i) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * i,
              index: i,
            })}
            onViewableItemsChanged={({ viewableItems }) => {
              if (viewableItems[0]) {
                setCurrentIndex(viewableItems[0].index ?? 0);
              }
            }}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            renderItem={({ item }) => (
              <Pressable
                style={{ width: SCREEN_WIDTH }}
                className="items-center justify-center flex-1"
                onPress={() => setSelectedIndex(null)}
              >
                <Image
                  source={item}
                  style={{ width: SCREEN_WIDTH, height: 300 }}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};
