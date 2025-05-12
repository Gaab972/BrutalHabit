import { StyleSheet, View, ViewProps } from "react-native";
import { Colors } from "../Constants/Colors";

export default function HabitCardTemplate({style, ...rest}: ViewProps)
{
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