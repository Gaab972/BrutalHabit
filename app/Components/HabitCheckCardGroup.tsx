import { View, StyleSheet } from "react-native"
import HabitCheckCard from "./HabitCheckCard"
import { Colors } from "../Constants/Colors"
import { useEffect, useState } from "react";
import { GetHabits, Habit } from "../Functions/Services/Service_Habit";

type Props = {
    date: Date,
}

export default function HabitCheckCardGroup({date} : Props)
{
  var today = new Date();
  var isToday = IsSameDate(date, today);

  const [habits, setHabits] = useState<Habit[]>([]);
  
  useEffect(() => {
    const loadHabits = async () => {
      const data = (await GetHabits("user_default")).filter(
        (habit) => {
          if (isToday) 
          {
            return HabitIsToday(habit)
          }
          else if (today > date)
          {
            for(var i = 0; i < habit.completionDates.length; i++)
            {
              var completionDate = habit.completionDates[i];
              if (IsSameDate(date, completionDate.date)) 
              {
                return true;
              }
            }

            return false;
          }
          else
          {
            return habit.frequency.includes(GetFrequencyIndex(date))
          }
        }
      );

      setHabits(data);
    };

    loadHabits();
  }, [date]);

  return <View style={styles.HabitBackground}>
          {habits.map((habit) => (<HabitCheckCard key={habit.id} {...habit} isChecked={false} state={GetHabitCheckCardState(date)}/>))}
      </View>
}

const styles = StyleSheet.create({
  HabitBackground: {
    flex: 1,
    width: "100%",
    marginTop: 43,
    elevation: 20,
    borderRadius: 30,
    backgroundColor: Colors["greyWhite"],
    paddingVertical: 22,
    gap: 10,
    alignItems: "center"
  },
})

function HabitIsToday(habit: Habit) : boolean
{
  var today = new Date();
  const todayFrequencyIndex = GetFrequencyIndex(today);
  return habit.frequency.includes(todayFrequencyIndex);
}

function GetFrequencyIndex(date:Date) : number
{
  var dayNumber = date.getDay();
  if (dayNumber == 0) return 6;

  return dayNumber - 1;
}

function IsSameDate(date1: Date, date2: Date)
{
  return date1.getDate() == date2.getDate() 
  && date1.getMonth() == date2.getMonth() 
  && date1.getFullYear() == date2.getFullYear();
}

function GetHabitCheckCardState(date: Date) : "earlier" | "today" | "later" {
  const today = new Date();

  if (IsSameDate(date, today)) return "today";
  if (date < today) return "earlier";
  return "later";
}