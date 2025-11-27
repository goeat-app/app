import { useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, usePathname } from 'expo-router';

import '../global.css';

import Loading from '@/components/loading/loading';
import { useAuthStore } from '@/store/auth-store';

const PROTECTED_ROUTES = [
  '/recomendations/recomendations',
  '/home/home',
  '/favorites/favorites',
  '/profile-page/profile-page',
  '/edit-profile/edit-profile',
  '/place-details/place-details',
  'profile-mapping/step-one/step-one',
  'profile-mapping/step-two/step-two',
  'profile-mapping/step-three/step-three',
];

export default function Layout() {
  const [fontsLoaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsMedium: Poppins_500Medium,
    PoppinsSemiBold: Poppins_600SemiBold,
  });

  const pathname = usePathname();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isHydrated = useAuthStore(state => state._hasHydrated);
  const isReady = fontsLoaded && isHydrated;

  // const clearAuth = useAuthStore(state => state.clearAuth);

  // useEffect(() => {
  //   // Descomente para forçar logout na próxima recarga
  //   clearAuth();
  // }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);

    if (!isAuthenticated && isProtectedRoute) {
      router.replace('/signin/signin-view');
      return;
    }

    if (isAuthenticated && pathname === '/signin/signin-view') {
      router.replace('/home/home');
    }
  }, [isAuthenticated, pathname, isReady]);

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

  if (!fontsLoaded || !isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-[#FDF6F5]">
        <ActivityIndicator size="large" color="#FF7947" />
        <Text className="mt-4 text-[#FF7947] text-base">Carregando...</Text>
      </View>
    );
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
            <Stack.Screen
              name="profile-mapping/step-one/step-one"
              options={{
                headerShown: false,
              }}
            />
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

          <Loading />
          <Toast />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
