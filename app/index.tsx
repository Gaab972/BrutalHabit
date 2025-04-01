import { StyleSheet, Text, View } from "react-native";
import { Colors } from "./Constants/Colors";
import { useFonts } from 'expo-font';

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Teachers-Bold': require('../assets/fonts/Teachers-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.MainBackground}>
      <Text style={styles.Title}>Aujourd'hui</Text>

      <View style={styles.Date}>

      </View>

      <View style={styles.HabitBackground}>

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  MainBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors["greyWhite"]
  },
  Date: {
    width: "100%",
    height: 48,
    marginTop: 43,
    elevation: 20,
    borderRadius: 30,
    backgroundColor: Colors["greyWhite"]
  },
  HabitBackground: {
    flex: 1,
    width: "100%",
    marginTop: 43,
    elevation: 20,
    borderRadius: 30,
    backgroundColor: Colors["greyWhite"]
  },
  Title: {
    fontSize: 32,
    width: 187,
    alignSelf: "flex-start",
    marginLeft: 31,
    marginTop: 57,
    fontFamily: "Teachers-Bold",
    color: Colors["tint"]
  }
})
