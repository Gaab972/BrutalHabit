import { View, StyleSheet, Text } from "react-native";
import Colors from "../Constants/Colors";
import HabitCreateCard from "../Components/HabitCreateCard";
import { useState } from "react";
import FrequencySelector from "../Components/FrequencySelector";

export default function CreateHabitScreen()
{
  const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  return <View style={styles.MainBackground}>
          <Text style={styles.Title}>New habit</Text>
          <View style={{width: "100%", marginTop: 30}}>
            <HabitCreateCard onNameChange={setName}/>
            <Text style={styles.CategoryTitle}>Frequency</Text>
            <FrequencySelector selectedDaysIndex={selectedDays} SetSelectedDaysIndex={setSelectedDays}/>
            <Text style={styles.CategoryTitle}>Brutal Mode</Text>
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
});