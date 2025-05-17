import { View, StyleSheet, Text, Image, Pressable, Modal } from "react-native";
import Colors from "../Constants/Colors";
import HabitCreateCard from "../Components/HabitCreateCard";
import { useEffect, useState } from "react";
import FrequencySelector from "../Components/FrequencySelector";
import Row from "../Components/Row";
import SwitchButton from "../Components/SwitchButton";
import HabitCreateDescription from "../Components/HabitDescription";
import OKButton from "../Components/OKButton";
import { deleteHabit, GetHabit, Habit, updateHabit } from "../Functions/Services/Service_Habit";
import { router, useLocalSearchParams } from "expo-router";

export default function HabitDetailScreen()
{
  const [newName, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [brutalModeEnabled, setBrutalModeEnabled] = useState(false);
  const [description, setDescription] = useState("");
  const [editable, setEditable] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const {id} = useLocalSearchParams();
  const habitId = id as string;
  const [habit, setHabit] = useState<Habit | null>(null);

  useEffect(() => {
    const loadHabit = async () => {
      const data = await GetHabit(habitId)
      .then(setHabit)
      .catch(console.error)
    }

    loadHabit();
  }, [habitId])

  useEffect(() => {
    if (!habit) return;

    setName(habit.name);
    setSelectedDays(habit.frequency);
    setBrutalModeEnabled(habit.brutalMode);
    setDescription(habit.description ?? "");
  }, [habit])

  return (
  <>
  <View style={styles.Background}>
          <Pressable onPress={() => router.back()}>
            <Row style={{alignItems: "center", marginTop:49}}>
            <Image
              source={require("@/assets/images/Chevron.png")}
              style={styles.BackArrow}
              tintColor={Colors.tint}
            />
            <Text style={styles.Title}>{"Habit"}</Text>
            </Row>
          </Pressable>
          
          <View style={styles.Content}>
            <View style={styles.CategoryView}>
              <HabitCreateCard text={newName} onNameChange={setName} editable={editable} streak={habit?.streak}/>
            </View>
            <Row style={styles.CategoryView}>
              <Text style={styles.CategoryTitle}>Max streak :</Text>
              <Text style={styles.MaxStreakNumber}>{habit?.maxStreak}</Text>
              <Image
                source={require("@/assets/images/flamme.png")}
                style={{ width: 28, height: 28 }}
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

            {editable &&
            <View style={styles.DeleteHabitView}>
                <OKButton icon={require("@/assets/images/Trashcan.png")} onPress={OnPressDelete}/>
            </View>
            }

            {!editable && 
            <View style={styles.OKButtonView}>
              <OKButton icon={require("@/assets/images/EditIcon.png")} onPress={OnPressEditIcon}/>
            </View>
            }

            
          </View>
      </View>
      <Modal visible={isDeleteModalVisible} transparent onRequestClose={() => setIsDeleteModalVisible(false)} animationType="fade">
              <View style={styles.DeleteModalViewPopup}>
                <View style={styles.DeleteModalView}>
                  <Text style={styles.DeleteModalText}>Are you sure you want to delete this habit?</Text>
                  <Row style={{justifyContent: "center", marginTop: 30}} gap={60}>
                    <OKButton text="Yes" onPress={Delete}/>
                    <OKButton text="No" onPress={() => setIsDeleteModalVisible(false)}/>
                    </Row>
                  
              </View>
              </View>
      </Modal>
  </>
  )

  function OnPressOK()
  {
    if (!NameIsValid() || !FrequencyIsValid()) return;

    if (brutalModeEnabled)
    {
      //Do something, double confirmation
    }

    updateHabit(habitId, {
      name: newName,
      description: description,
      frequency: selectedDays,
      brutalMode: brutalModeEnabled,
    })

    setEditable(false)
  }

  function OnPressDelete()
  {
    setIsDeleteModalVisible(true);
  }

  function Delete()
  {
    deleteHabit(habitId);
    router.back();
  }

  function OnPressEditIcon()
  {
    setEditable(true);
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
  BackArrow: {
    width: 48,
    height: 20,
    marginTop: 5,
  },
  Title: {
    fontSize: 32,
    alignSelf: "flex-start",
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
    marginLeft: 41,
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
  DeleteHabitView: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 0,
    paddingRight: 15,
    paddingBottom: 27,
  },
  MaxStreakNumber: {
    marginTop: 3,
    marginLeft: 7,
    fontSize: 16,
    fontFamily: "Teachers-SemiBold",
    textAlign: "center",
    alignSelf: "flex-start",
  },
  DeleteModalViewPopup: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  DeleteModalView:{
    width: "80%",
    height: "20%",
    backgroundColor: Colors.lightWhite,
    // borderWidth: 3,
    elevation: 10,
    // borderColor: Colors.tint,
    borderRadius: 10,
    
  },
  DeleteModalText:{
    fontSize: 14,
    marginTop: 20,
    fontFamily: "Teachers-SemiBold",
    textAlign: "center",
  }
});