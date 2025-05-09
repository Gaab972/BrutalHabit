import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../Constants/Colors";
import HabitCard from "../Components/HabitCard";
import { GetHabits, Habit } from "../Functions/Services/Service_Habit";
import { useEffect, useState } from "react";
import NewHabitCard from "../Components/NewHabitCard";

export default function AllHabitsScreen() {

const [habits, setHabits] = useState<Habit[]>([]);

useEffect(() => {
  const loadHabits = async () => {
    const data = await GetHabits("user_default");
    setHabits(data);
  };

  loadHabits();
}, []);

  return (
    <View style={styles.MainBackground}>
        <Text style={styles.Title}>Habits</Text>
        <View style={styles.HabitBackground}>
            {habits.map((habit) => (<HabitCard key={habit.id} {...habit} />))}
            <NewHabitCard/>
        </View>
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
    fontWeight: "bold",
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