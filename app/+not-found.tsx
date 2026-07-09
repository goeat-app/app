import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../hooks/use-auth';
import { Typography } from '@/components/typography/typography';
import { Button } from '@/components/button/button';

export default function NotFound() {
  const { isAuthenticated } = useAuth();

  const handleGoHome = () => {
    if (isAuthenticated) {
      router.replace('/home/home');
    } else {
      router.replace('/signin/signin-view');
    }
  };

  useEffect(() => {
    handleGoHome();
  }, []);

  return (
    <View className="flex-1 bg-[#FDF6F5] justify-center items-center px-6">
      {/* 404 Display */}
      <View className="items-center gap-4 mb-8">
        <Text className="text-9xl font-bold text-[#FF6B35] opacity-20">
          404
        </Text>
        <Typography
          type="h2"
          text="Page Not Found"
          className="text-[#00141C] font-poppins-bold text-center"
        />
      </View>

      {/* Message */}
      <View className="items-center gap-6 mb-12">
        <Typography
          type="body"
          text="Sorry, the page you're looking for doesn't exist. It might have been removed or the URL might be incorrect."
          className="text-[#828282] text-center leading-6"
        />
      </View>

      {/* Action Buttons */}
      <View className="px-4 w-1/3 max-w-[80%] gap-3">
        <Button className="bg-[#FF6B35] py-4 px-6" onPress={handleGoHome}>
          <Text className="text-white font-poppins-medium text-md text-center">
            Go to Home
          </Text>
        </Button>
      </View>

      {/* Decorative element */}
      <View className="absolute top-12 right-6 w-24 h-24 bg-[#FBDD9C] rounded-full opacity-30" />
      <View className="absolute bottom-20 left-6 w-32 h-32 bg-[#FFC8A6] rounded-full opacity-20" />
    </View>
  );
}
