import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../Constants/Colors";
import { GetMonthName } from "../Functions/Format";
import { useState } from "react";
import DateCalendar from "../Components/DateCalendar";
import HabitCheckCardGroup from "../Components/HabitCheckCardGroup";
import BottomNavBar from "../Components/BottomNavBar";

export default function DailyHabitsScreen() 
{
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.MainBackground}>
      <Text style={styles.Title}>{GetDateTitle(selectedDate)}</Text>
      <DateCalendar onDateSelected={setSelectedDate}/>
      <HabitCheckCardGroup date={selectedDate}/>
      <BottomNavBar selectedPage="DailyHabits"/>
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
    color: Colors["tint"]
  },
})

function GetDateTitle(date: Date) : string
{
    var today = new Date();
    var isToday = date.getDate() == today.getDate() 
    && date.getMonth() == today.getMonth() 
    && date.getFullYear() == today.getFullYear();

    if (isToday) return "Today";
    return `${date.getDate().toString().padStart(2, '0')} ${GetMonthName(date)} ${date.getFullYear()}`
}