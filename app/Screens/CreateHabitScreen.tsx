import { View, StyleSheet, Text } from "react-native";
import Colors from "../Constants/Colors";
import HabitCreateCard from "../Components/HabitCreateCard";
import HabitCardTemplate from "../Components/HabitCardTemplate";
import HabitCard from "../Components/HabitCard";

export default function CreateHabitScreen()
{
    return <View style={styles.MainBackground}>
            <Text style={styles.Title}>New habit</Text>
            <View style={{width: "100%", marginTop: 30}}>
              <HabitCardTemplate/>

              <Text style={styles.CategoryTitle}>Frequency</Text>
              <Text style={styles.CategoryTitle}>Bruttal Mode</Text>
            </View>
        </View>
}

const styles = StyleSheet.create({
  MainBackground: {
    flex: 1,
    backgroundColor: Colors["greyWhite"],
  },
  Title: {
    fontSize: 32,
    width: "100%",
    alignSelf: "flex-start",
    marginLeft: 31,
    marginTop: 57,
    fontFamily: "Teachers-Bold",
    fontWeight: "bold",
    color: Colors["tint"],
  },
  CategoryTitle: {
    fontSize: 16,
    width: "100%",
    alignSelf: "flex-start",
    marginLeft: 42,
    marginTop: 41,
    fontFamily: "Teachers-Bold",
    fontWeight: "bold",
    color: Colors["black"],
    opacity: 0.75,
  },
  HabitBackground: {
    flex: 1,
    width: "100%",
    marginTop: 43,
    elevation: 20,
    borderRadius: 30,
    backgroundColor: Colors["greyWhite"],
    paddingVertical: 22,
    gap: 10,
    alignItems: "center",
  },
});