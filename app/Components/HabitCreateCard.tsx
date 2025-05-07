import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Colors } from "../Constants/Colors";
import { useFonts } from "expo-font";
import HabitCardTemplate from "./HabitCardTemplate";
import { useState } from "react";

type Props = {
  onNameChange: (value: string) => void;
}

export default function HabitCreateCard({onNameChange} : Props)
{
    const [fontsLoaded] = useFonts({
        'Teachers-SemiBold': require('../../assets/fonts/Teachers-SemiBold.ttf'),
      });

      const [fontsLoaded2] = useFonts({
        'TeachersMedium': require('../../assets/fonts/TeachersMedium.ttf'),

      });

      const [text, setText] = useState("")
    
      if (!fontsLoaded || !fontsLoaded2) {
        return null;
      }

    return (
      <HabitCardTemplate>
        <View style={{height: "100%", width: "75%", justifyContent: "center"}}>
            <Text style={styles.CategoryTitle}>{"Name"}</Text>
            <TextInput 
            placeholder="Habit"
            style={styles.Name}
            value={text}
            onChangeText={OnNameChange}
            />
        </View>

        <View style={styles.StreakContainer}>
            <Text style={styles.Streak}>{0}</Text>
            <Image
                  source={require("@/assets/images/flamme.png")}
                  style={{ width: 30, height: 30 }}
                />
        </View>
      </HabitCardTemplate>
    );

    function OnNameChange(value: string)
    {
      onNameChange(value);
      setText(value)
    }
}

const styles = StyleSheet.create({
    CategoryTitle2: {
        flexWrap: "nowrap",
        position: "absolute",
      },
      CategoryTitle: {
        fontSize: 16,
        left: 26,
        top: -14,
        position: "absolute",
        fontFamily: "Teachers-Bold",
        fontWeight: "bold",
        textAlign: "center",
        color: Colors["black"],
        backgroundColor: Colors.greyWhite,
        opacity: 0.75,
      },
    Name: {
        fontFamily: "Teachers-SemiBold",
        left: 23,
        fontSize: 16,
    },
    StreakContainer: {
        flexDirection: "row",
        marginRight: 18.5,
        alignItems : "center"
    },
    Streak: {
        fontFamily: "Teachers-SemiBold",
        fontSize: 16,
        marginLeft: 18.5,
    },
    Emoji: {
        fontSize: 18,
        marginLeft : 2,
        paddingBottom: 8 
    },
    Checkbox : {
        position: "absolute",
        alignSelf: "flex-end",
        top: "50%",
        transform: [{ translateY: -25 / 2 }], // ou valeur fixe ex. -20
        right: 28,
    }
})