import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Button } from '@/components/button';
import { Typography } from '@/components/typography/typography';

import { ReviewCategory } from './components/review-category';
import { useReviewsModel } from './reviews.model';

export default function Reviews() {
  const { ratings, setRating } = useReviewsModel();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#FDF6F5]"
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 20}
    >
      <View className="flex-1 gap-4">
        <View className="gap-2 items-center">
          <Typography
            type="h1"
            text="Sua avaliação"
            className="font-plus-jakarta-medium color-[#003247]"
          />

          <Typography
            type="span"
            text="Como foi sua experiência?"
            className="font-plus-jakarta-semi-bold text-lg"
          />
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <View className="gap-8 p-4">
            <ReviewCategory
              title="Atendimento"
              question="Como foi sua experiência com os funcionários do local?"
              rating={ratings.service}
              onChange={value => setRating('service', value)}
            />

            <ReviewCategory
              title="Comida e bebida"
              question="A comida e/ou bebida estava boa?"
              rating={ratings.foodAndDrink}
              onChange={value => setRating('foodAndDrink', value)}
            />

            <ReviewCategory
              title="Preço"
              question="O preço estava dentro do esperado?"
              rating={ratings.price}
              onChange={value => setRating('price', value)}
            />
          </View>

          <View className="flex p-4">
            <Typography
              type="span"
              text="Conta um pouco mais..."
              className="font-plus-jakarta-semi-bold text-lg color-[#354259]"
            />

            <TextInput
              placeholder="Escreva aqui sua experiência..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="border border-[#E5E7EB] rounded-2xl p-4 font-poppins text-sm bg-white min-h-[120px]"
            />
          </View>
        </ScrollView>

        <View className="flex items-center">
          <Button className="flex items-center justify-center w-[80%] h-[50px] bg-[#FF6B35]">
            <Typography
              type="span"
              text="Salvar"
              className="font-poppins-semi-bold text-xl color-[#fff]"
            />
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
