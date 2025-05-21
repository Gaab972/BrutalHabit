import { useFonts } from "expo-font";
import DailyHabitsScreen from "./Screens/DailyHabitsScreen";
import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  Unsubscribe,
  setDoc,
} from 'firebase/firestore';
import { database } from "@/firebaseConfig";


export default function Index() 
{
  const [fontsLoaded] = useFonts({
    "Teachers-Bold": require("../assets/fonts/Teachers-Bold.ttf"),
    "Teachers-SemiBold": require("../assets/fonts/Teachers-SemiBold.ttf"),
    "TeachersMedium": require("../assets/fonts/TeachersMedium.ttf")
  });

  useEffect(() => {
    const checkAndCreateUser = async () => {
      const userId = "user_default";
      const queryUsers = query(collection(database, "users"), where("userId", "==", userId));
      const snapshot = await getDocs(queryUsers);
      if (snapshot.empty)
      {
        await setDoc(doc(database, "users", userId), {
          userId: userId,
        })
      }
    }

    checkAndCreateUser();
  }, [])

  if (!fontsLoaded) return null;

  return <StripeProvider publishableKey="pk_test_51RPeuDCtrWtcy49ptEpdguouu7IbiOssEfF9HWx6fxi6KTYJCDZIdEEh0vYnKD0YeqsDbYWqWat2hPjjK4G5sQMg00X0x0zgp4">
    <DailyHabitsScreen/>
  </StripeProvider> 
}