import { useFonts } from "expo-font";
import DailyHabitsScreen from "./Screens/DailyHabitsScreen";
import { StripeProvider } from '@stripe/stripe-react-native';

export default function Index() 
{
  const [fontsLoaded] = useFonts({"Teachers-Bold": require("../assets/fonts/Teachers-Bold.ttf")});
  const [fontsLoaded1] = useFonts({"Teachers-SemiBold": require("../assets/fonts/Teachers-SemiBold.ttf")});
  const [fontsLoaded2] = useFonts({"TeachersMedium": require("../assets/fonts/TeachersMedium.ttf")});

  if (!fontsLoaded || !fontsLoaded1 || !fontsLoaded2) return null;

  return <StripeProvider publishableKey="pk_test_51RPeuDCtrWtcy49ptEpdguouu7IbiOssEfF9HWx6fxi6KTYJCDZIdEEh0vYnKD0YeqsDbYWqWat2hPjjK4G5sQMg00X0x0zgp4">
    <DailyHabitsScreen/>
  </StripeProvider> 
}