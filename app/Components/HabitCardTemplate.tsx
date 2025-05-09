import { StyleSheet, View, ViewProps } from "react-native";
import { Colors } from "../Constants/Colors";
import { useFonts } from "expo-font";

export default function HabitCardTemplate({style, ...rest}: ViewProps)
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
      <View style={[styles.Background, style]} {...rest}/>
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
})