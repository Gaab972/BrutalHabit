import { View, StyleSheet, Text } from "react-native";
import Colors from "../Constants/Colors";
import HabitCreateCard from "../Components/HabitCreateCard";
import { useState } from "react";
import FrequencySelector from "../Components/FrequencySelector";
import Row from "../Components/Row";
import SwitchButton from "../Components/SwitchButton";
import HabitCreateDescription from "../Components/HabitDescription";
import OKButton from "../Components/OKButton";
import { AddHabit } from "../Functions/Services/Service_Habit";
import { router } from "expo-router";

export default function CreateHabitScreen()
{
  const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [brutalModeEnabled, setBrutalModeEnabled] = useState(false);
  const [description, setDescription] = useState("");

  return <View style={styles.Background}>
          <Text style={styles.Title}>New habit</Text>
          <View style={styles.Content}>
            <View style={styles.CategoryView}>
              <HabitCreateCard text={name} onNameChange={setName} editable={true}/>
            </View>
            <View style={styles.CategoryView}>
              <Text style={styles.CategoryTitle}>Frequency</Text>
              <FrequencySelector selectedDaysIndex={selectedDays} SetSelectedDaysIndex={setSelectedDays} canInteract={true}/>
            </View>

            <Row style={styles.CategoryView}>
              <Text style={styles.CategoryTitle}>Brutal Mode</Text>
              <SwitchButton enabled={brutalModeEnabled} onToggleSwitch={setBrutalModeEnabled} canInteract={true}/>
            </Row>
            
            <View style={styles.CategoryView}>
              <HabitCreateDescription description={description} onDescriptionChange={setDescription} editable={true}/>
            </View>

            <View style={styles.OKButtonView}>
              <OKButton text="OK" onPress={OnPressOK}/>  
            </View>
                      
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
      name: name,
      description: description,
      frequency: selectedDays,
      brutalMode: brutalModeEnabled,
    }, "user_default")

    router.back();
  }

  function NameIsValid() : boolean
  {
    if (name.length < 1)
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
    color: Colors["tint"],
  },
  CategoryView : 
  {
    marginTop: 40,
  },
  CategoryTitle: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginLeft: 42,
    fontFamily: "Teachers-Bold",
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
});