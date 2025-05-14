import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../Constants/Colors";
import HabitCard from "../Components/HabitCard";
import { SubscribeToHabits, Habit } from "../Functions/Services/Service_Habit";
import { useEffect, useState } from "react";
import NewHabitCard from "../Components/NewHabitCard";
import BottomNavBar from "../Components/BottomNavBar";

export default function AllHabitsScreen() {

const [habits, setHabits] = useState<Habit[]>([]);

useEffect(() => {
  const unsubscribe = SubscribeToHabits("user_default", setHabits);
  return () => unsubscribe();
}, []);

  return (
    <View style={styles.MainBackground}>
        <Text style={styles.Title}>Habits</Text>
        <View style={styles.HabitBackground}>
            {habits.map((habit) => (<HabitCard key={habit.id} {...habit} />))}
            <NewHabitCard/>
        </View>
    <BottomNavBar selectedPage="AllHabits"/>
    </View>
  );
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
    color: Colors["tint"],
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