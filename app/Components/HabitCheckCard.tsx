import { StyleSheet, View, ViewProps, Text, Image } from "react-native";
import { Colors } from "../Constants/Colors";
import { useFonts } from "expo-font";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';


type Props = ViewProps & {
    name: string;
    streak: number;
    isChecked: boolean;
}

export default function HabitCheckCard({name, streak, isChecked} : Props)
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
      <View style={styles.Background}>
        <Text style={styles.Name}>{name}</Text>
        <View style={styles.StreakContainer}>
          <Text style={styles.Streak}>{streak}</Text>
          <Image
            source={require("@/assets/images/flamme.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <TouchableOpacity style={styles.Checkbox}>
          {isChecked ? (
            <Ionicons name="checkbox" size={25} color="#2F90EB" />
          ) : (
            <Ionicons name="square-outline" size={25} color="#aaa" />
          )}
        </TouchableOpacity>
      </View>
    );
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
    Checkbox : {
        position: "absolute",
        alignSelf: "flex-end",
        top: "50%",
        transform: [{ translateY: -25 / 2 }], // ou valeur fixe ex. -20
        right: 28,
    }
})