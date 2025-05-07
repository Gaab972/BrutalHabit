import { StyleSheet, View, Text, Image, ViewProps } from "react-native";
import { Colors } from "../Constants/Colors";
import { useFonts } from "expo-font";

export default function HabitCardTemplate({...rest}: ViewProps)
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
      <View style={styles.Background} {...rest}/>
    );
}

const styles = StyleSheet.create({
    Background: {
        elevation: 3,
        width: "90%",
        height: 60,
        borderRadius: 20,
        backgroundColor: Colors["greyWhite"],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center"
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