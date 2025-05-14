import { StyleSheet, View, ViewProps, Text, Image } from "react-native";
import { Colors } from "../Constants/Colors";
import { useFonts } from "expo-font";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useState } from "react";
import { CompletionDate, updateHabit } from "../Functions/Services/Service_Habit";


type State = "earlier" | "today" | "later";

type Props = ViewProps & {
    id: string;
    name: string;
    streak: number;
    isChecked: boolean;
    state : State;
    completionDates: CompletionDate[]
}

export default function HabitCheckCard({id, name, streak, isChecked, state, completionDates} : Props)
{
    const [newIsChecked, setNewIsChecked] = useState(isChecked);
    const [actualStreak, setActualStreak] = useState(streak)

    return (
      <View style={[styles.Background,
       state === "earlier" && { opacity: 0.5 }]}>
        <Text style={styles.Name}>{name}</Text>
        <View style={styles.StreakContainer}>
          <Text style={styles.Streak}>{actualStreak}</Text>
          <Image
            source={require("@/assets/images/flamme.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
        
        {state === "later" ? (<View style={styles.CheckboxView}>

          <Image source={require("@/assets/images/padlock.png")} style={styles.Padlock}/>
        </View>
        ) : (
          <View style={styles.CheckboxView}>
            <TouchableOpacity onPress={(OnCheckboxTap)} disabled={state !== "today"}>
              {newIsChecked ? (
                <Ionicons name="checkbox" size={25} color="#2F90EB" />
              ) : (
                <Ionicons name="square-outline" size={25} color="#aaa" />
              )}

            </TouchableOpacity>
          </View>
        )}
      </View>
    );


    function OnCheckboxTap()
    {
      setNewIsChecked((prev) => !prev)
      var completed = !newIsChecked;
      var newStreak = actualStreak;
      var today = new Date();

      for (var i = 0; i < completionDates.length; i++)
        {
          var completionDate = completionDates[i];
          if (IsSameDate(today, completionDate.date))
          {
            completionDates[i].completed = completed;
            newStreak = completed ? newStreak + 1 : newStreak - 1
            setActualStreak(newStreak);
          }
        }

      updateHabit(id, {completionDates: completionDates, streak: newStreak})    
    }
}

const styles = StyleSheet.create({
    Background: {
        elevation: 3,
        width: "90%",
        height: 60,
        borderRadius: 20,
        backgroundColor: Colors["greyWhite"]
    },
    Name: {
        fontFamily: "Teachers-SemiBold",
        marginTop: 13.5,
        marginLeft: 18.5,
    },
    StreakContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    Streak: {
        fontFamily: "TeachersMedium",
        marginLeft: 18.5,
        fontSize: 12,
    },
    CheckboxView: {
      position: "absolute",
      alignSelf: "flex-end",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: "100%",
      right: 20,
    },
    Padlock : {
      width: 32,
      height: 32,
    }
})

function IsSameDate(date1: Date, date2: Date)
{
  return date1.getDate() == date2.getDate() 
  && date1.getMonth() == date2.getMonth() 
  && date1.getFullYear() == date2.getFullYear();
}