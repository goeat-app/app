import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BackButtonDisplayMode } from 'react-native-screens';
import Toast from 'react-native-toast-message';

import {
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
} from '@expo-google-fonts/be-vietnam-pro';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { router, Stack, usePathname } from 'expo-router';
import { getProfileMapping } from 'use-cases/profile-mapping/profile-mapping.use-case';

import { GoogleMapsProvider } from '@/components/google-maps-provider/google-maps-provider';
import Loading from '@/components/loading/loading';
import { PwaInstallBanner } from '@/components/pwa-install-banner/pwa-install-banner';
import { useAuth } from '@/hooks/use-auth';
import {
  initAnalytics,
  trackScreen,
  trackUserId,
} from '@/lib/analytics/analytics';
import { useProfileMappingStore } from '@/store/profile-mapping';

import '../global.css';

const PROTECTED_ROUTES = [
  '/recommendations/recommendations-view',
  '/home/home',
  '/favorites/favorites',
  '/profile-page/profile-page',
  '/edit-profile/edit-profile',
  '/restaurant-details/restaurant-details/[id]',
  '/profile-mapping/step-one/step-one-view',
  '/profile-mapping/step-two/step-two-view',
  '/profile-mapping/step-three/step-three-view',
  '/recommendations-map/recommendations-map',
  '/reviews/reviews',
];

const PROFILE_MAPPING_ROUTE_PREFIX = '/profile-mapping/';

async function syncWebAnalytics(pathname: string, userId: string | null) {
  await initAnalytics();
  if (pathname) {
    await trackScreen(pathname);
  }
  await trackUserId(userId);
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsMedium: Poppins_500Medium,
    PoppinsSemiBold: Poppins_600SemiBold,
    PlusJakartaRegular: PlusJakartaSans_400Regular,
    PlusJakartaMedium: PlusJakartaSans_500Medium,
    PlusJakartaSemiBold: PlusJakartaSans_600SemiBold,
    BeVietnamProRegular: BeVietnamPro_400Regular,
    BeVietnamProMedium: BeVietnamPro_500Medium,
    BeVietnamProSemiBold: BeVietnamPro_600SemiBold,
  });

  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuth();
  const hasCreatedProfileMapping = useProfileMappingStore(
    state => state.hasCreatedProfileMapping,
  );
  const [profileMappingCheckedUserId, setProfileMappingCheckedUserId] =
    useState<string | null>(null);
  const [needsProfileMapping, setNeedsProfileMapping] = useState(false);
  const isProfileMappingLoading =
    isAuthenticated && profileMappingCheckedUserId !== user?.uid;
  const isReady = fontsLoaded && !isLoading && !isProfileMappingLoading;

  useEffect(() => {
    let isActive = true;

    if (!user) {
      useProfileMappingStore.getState().setHasCreatedProfileMapping(false);
      setProfileMappingCheckedUserId(null);
      setNeedsProfileMapping(false);
      return () => {
        isActive = false;
      };
    }

    const checkProfileMapping = async () => {
      const result = await getProfileMapping();

      if (!isActive) {
        return;
      }

      setNeedsProfileMapping(result.success && !result.profileMapping);
      setProfileMappingCheckedUserId(user.uid);
    };

    void checkProfileMapping();

    return () => {
      isActive = false;
    };
  }, [user]);

  useEffect(() => {
    if (Platform.OS !== 'web' || __DEV__ || !('serviceWorker' in navigator)) {
      return;
    }

    void navigator.serviceWorker.register('/sw.js').catch(error => {
      console.warn('Service worker registration failed.', error);
    });
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      return;
    }

    void syncWebAnalytics(pathname, user?.uid ?? null);
  }, [pathname, user?.uid]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);

    if (!isAuthenticated && isProtectedRoute) {
      router.replace('/signin/signin-view');
      return;
    }

    if (
      isAuthenticated &&
      needsProfileMapping &&
      !hasCreatedProfileMapping &&
      !pathname.startsWith(PROFILE_MAPPING_ROUTE_PREFIX)
    ) {
      router.replace('/profile-mapping/step-one/step-one-view');
      return;
    }

    if (isAuthenticated && pathname === '/signin/signin-view') {
      router.replace('/home/home');
    }
  }, [
    hasCreatedProfileMapping,
    isAuthenticated,
    needsProfileMapping,
    pathname,
    isReady,
  ]);

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      title: '',
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerBackVisible: Platform.OS === 'ios',
      headerBackButtonDisplayMode: 'minimal' as BackButtonDisplayMode,
      headerStyle: { backgroundColor: '#FDF6F5' },
      headerLeft:
        Platform.OS === 'ios'
          ? undefined
          : prop =>
              prop.canGoBack && (
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

  if (!fontsLoaded || !isReady || isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[--primary-bg]">
        <ActivityIndicator size="large" color="#FF7947" />
        <Text className="mt-4 text-[#FF7947] text-base">Carregando...</Text>
      </View>
    );
  }

  return (
    <GoogleMapsProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
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

                <Stack.Screen
                  name="signin/signin-view"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="signup/signup-view" />
                <Stack.Screen
                  name="profile-mapping/step-one/step-one-view"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="profile-mapping/step-two/step-two-view" />
                <Stack.Screen name="profile-mapping/step-three/step-three-view" />
                <Stack.Screen
                  name="recommendations/recommendations-view"
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
                  name="restaurant-details/restaurant-details/[id]"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="recommendations-map/recommendations-map"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>

              <Loading />
              <Toast />
              <PwaInstallBanner />
            </KeyboardAvoidingView>
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </GoogleMapsProvider>
  );
}
