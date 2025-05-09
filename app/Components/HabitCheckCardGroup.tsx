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
  console.log("IsToday => " + isToday)

  const [habits, setHabits] = useState<Habit[]>([]);
  
  useEffect(() => {
    const loadHabits = async () => {
      const data = (await GetHabits("user_default")).filter(
        (habit) => {
          if (isToday) {
            console.log("HABIT IS TODAY => " + HabitIsToday(habit))
            return HabitIsToday(habit)
          }
          else
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
        }
      );

      setHabits(data);
    };

    loadHabits();
  }, []);

  console.log("Habits count : " + habits.length)

  return <View style={styles.HabitBackground}>
          {habits.map((habit) => (<HabitCheckCard key={habit.id} {...habit} isChecked={false} />))}
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