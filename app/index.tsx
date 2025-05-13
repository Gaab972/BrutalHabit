import { useFonts } from "expo-font";
import DailyHabitsScreen from "./Screens/DailyHabitsScreen";

export default function Index() 
{
  const [fontsLoaded] = useFonts({"Teachers-Bold": require("../assets/fonts/Teachers-Bold.ttf")});
  const [fontsLoaded1] = useFonts({"Teachers-SemiBold": require("../assets/fonts/Teachers-SemiBold.ttf")});
  const [fontsLoaded2] = useFonts({"TeachersMedium": require("../assets/fonts/TeachersMedium.ttf")});

  if (!fontsLoaded || !fontsLoaded1 || !fontsLoaded2) return null;

  return <DailyHabitsScreen/>
}