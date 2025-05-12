import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Colors } from "../Constants/Colors";
import { useFonts } from "expo-font";
import HabitCardTemplate from "./HabitCardTemplate";

type Props = {
  text: string,
  streak?: number;
  onNameChange: (value: string) => void;
  editable: boolean;
}

export default function HabitCreateCard({text, onNameChange, editable, streak} : Props)
{
    const [fontsLoaded] = useFonts({
        'Teachers-SemiBold': require('../../assets/fonts/Teachers-SemiBold.ttf'),
      });

      const [fontsLoaded2] = useFonts({
        'TeachersMedium': require('../../assets/fonts/TeachersMedium.ttf'),
      });

      if (!fontsLoaded || !fontsLoaded2) {
        return null;
      }

    return (
      <HabitCardTemplate>
        <View style={{height: "100%", width: "75%", justifyContent: "center"}}>
            <Text style={styles.CategoryTitle}>{"Name"}</Text>
            <TextInput
            editable={editable}
            placeholder="Habit"
            style={styles.Name}
            value={text}
            onChangeText={onNameChange}
            />
        </View>

        <View style={styles.StreakContainer}>
            <Text style={styles.Streak}>{streak ?? 0}</Text>
            <Image
                  source={require("@/assets/images/flamme.png")}
                  style={{ width: 30, height: 30 }}
                />
        </View>
      </HabitCardTemplate>
    );
}

const styles = StyleSheet.create({
      CategoryTitle: {
        fontSize: 16,
        marginLeft: 21.5,
        top: -14,
        alignSelf: "flex-start",
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
        marginLeft: 18.5,
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
})