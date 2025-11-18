import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { router, Stack } from 'expo-router';

import '../global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import { useMemo } from 'react';

export default function Layout() {
  const [loaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsMedium: Poppins_500Medium,
    PoppinsSemiBold: Poppins_600SemiBold,
  });

  const screenOptions = useMemo(
    () => ({
      title: '',
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerBackVisible: false,
      headerStyle: { backgroundColor: '#FDF6F5' },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginLeft: 0 }}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={42}
            color="#FF7947"
          />
        </TouchableOpacity>
      ),
    }),
    [],
  );

  if (!loaded) {
    return <Text>Loading..</Text>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1 bg-[#FDF6F5]"
        edges={['top', 'right', 'bottom', 'left']}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <Stack screenOptions={screenOptions}>
            <Stack.Screen
              name="onboarding/first-onboarding"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen name="signin/signin" />
            <Stack.Screen name="signup/signup" />
            <Stack.Screen name="profile-mapping/step-one/step-one" />
            <Stack.Screen name="profile-mapping/step-two/step-two" />
            <Stack.Screen name="profile-mapping/step-three/step-three" />
            <Stack.Screen
              name="recomendations/recomendations"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="home/home"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="favorites/favorites"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="profile-page/profile-page"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="edit-profile/edit-profile"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="place-details/place-details"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
