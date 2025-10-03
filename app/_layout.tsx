import { Slot, Stack } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { Text } from "react-native";

import '../global.css';

export default function Layout() {
  const [loaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsMedium: Poppins_500Medium,
    PoppinsSemiBold: Poppins_600SemiBold,
  });

  if (!loaded) {
    return <Text>Loading...</Text>;
  }


  return <Stack screenOptions={{ headerShown: false }} />;
}