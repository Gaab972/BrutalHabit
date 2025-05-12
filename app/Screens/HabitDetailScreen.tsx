import { View, StyleSheet, Text, Image } from "react-native";
import Colors from "../Constants/Colors";
import HabitCreateCard from "../Components/HabitCreateCard";
import { useEffect, useState } from "react";
import FrequencySelector from "../Components/FrequencySelector";
import Row from "../Components/Row";
import SwitchButton from "../Components/SwitchButton";
import HabitCreateDescription from "../Components/HabitDescription";
import OKButton from "../Components/OKButton";
import { AddHabit, GetHabit, Habit } from "../Functions/Services/Service_Habit";
import { useLocalSearchParams } from "expo-router";
import { useFonts } from "expo-font";

export default function HabitDetailScreen()
{
  const [newName, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [brutalModeEnabled, setBrutalModeEnabled] = useState(false);
  const [description, setDescription] = useState("");
  const [editable, setEditable] = useState(false);

  const [fontsLoaded] = useFonts({
    'Teachers-SemiBold': require('../../assets/fonts/Teachers-SemiBold.ttf'),
  });

  const {id} = useLocalSearchParams();
  const [habit, setHabit] = useState<Habit | null>(null);

  useEffect(() => {
    const loadHabit = async () => {
      const data = await GetHabit(id.toString())
      .then(setHabit)
      .catch(console.error)
    }

    loadHabit();
  }, [id])

  useEffect(() => {
    if (!habit) return;

    setName(habit.name);
    setSelectedDays(habit.frequency);
    setBrutalModeEnabled(habit.brutalMode);
    setDescription(habit.description ?? "");
  }, [habit])

  if (!fontsLoaded) {
    return null;
  }

  return <View style={styles.Background}>
          <Text style={styles.Title}>{"Habit"}</Text>
          <View style={styles.Content}>
            <View style={styles.CategoryView}>
              <HabitCreateCard text={newName} onNameChange={setName} editable={editable}/>
            </View>
            <Row style={styles.CategoryView}>
              <Text style={styles.CategoryTitle}>Max streak :</Text>
              <Text style={styles.MaxStreakNumber}>{habit?.maxStreak}</Text>
              <Image
                source={require("@/assets/images/flamme.png")}
                style={{ width: 30, height: 30 }}
              />
            </Row>
            <View style={styles.CategoryView}>
              <Text style={styles.CategoryTitle}>Frequency</Text>
              <FrequencySelector selectedDaysIndex={selectedDays} SetSelectedDaysIndex={setSelectedDays} canInteract={editable}/>
            </View>

            <Row style={styles.CategoryView}>
              <Text style={styles.CategoryTitle}>Brutal Mode</Text>
              <SwitchButton enabled={brutalModeEnabled} onToggleSwitch={setBrutalModeEnabled} canInteract={editable}/>
            </Row>
            
            <View style={styles.CategoryView}>
              <HabitCreateDescription description={description} onDescriptionChange={setDescription} editable={editable}/>
            </View>
            
            {editable &&
            <View style={styles.OKButtonView}>
                <OKButton text="OK" onPress={OnPressOK}/>  
            </View>
            }
                      
          </View>
      </View>

  function OnPressOK()
  {
    if (!NameIsValid() || !FrequencyIsValid()) return;

    if (brutalModeEnabled)
    {
      //Do something, double confirmation
    }

    AddHabit({
      name: newName,
      description: description,
      frequency: selectedDays,
      brutalMode: brutalModeEnabled,
    }, "user_default")
  }

  function NameIsValid() : boolean
  {
    if (newName.length < 1)
    {
      console.log("Name not valid")
      //Do something
      return false;
    }

    return true;
  }

  function FrequencyIsValid() : boolean
  {
    if (selectedDays.length < 1)
    {
      console.log("Frequency not valid")
      //Do someting
      return false;
    }
    
    return true;
  }
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: Colors["greyWhite"],
  },
  Content: {
    flex: 1,
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
  CategoryView : 
  {
    marginTop: 40,
  },
  CategoryTitle: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginLeft: 41,
    fontFamily: "Teachers-Bold",
    fontWeight: "bold",
    textAlign: "center",
    color: Colors["black"],
    opacity: 0.75,
  },
  OKButtonView: {
    alignItems : "center",
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: 27,
  },
  MaxStreakNumber: {
    marginTop: 3,
    marginLeft: 7,
    fontSize: 16,
    fontFamily: "Teachers-SemiBold",
    textAlign: "center",
    alignSelf: "flex-start",
  }
});