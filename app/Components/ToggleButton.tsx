import { StyleProp, StyleSheet, TextStyle, Text, View, ViewStyle, Pressable } from "react-native";
import Colors from "../Constants/Colors";

type Props = {
    label: string,
    selected: boolean,
    canInteract: boolean,
    onPress: () => void,
    baseViewStyle?: StyleProp<ViewStyle>,
    onViewStyle?: StyleProp<ViewStyle>,
    offViewStyle?: StyleProp<ViewStyle>,
    baseTextStyle?: StyleProp<TextStyle>,
    onTextStyle?: StyleProp<TextStyle>,
    offTextStyle?: StyleProp<TextStyle>,
}

export default function ToggleButton({label, selected, onPress, baseViewStyle, onViewStyle, offViewStyle, baseTextStyle, onTextStyle, offTextStyle}: Props)
{
    const selectedViewStyle = selected 
        ? onViewStyle ?? styles.defaultOnViewStyle
        : offViewStyle ?? styles.defaultOffViewStyle

    const selectedTextStyle = selected
        ? onTextStyle ?? styles.defaultOnTextStyle
        : offTextStyle ?? styles.defaultOffTextStyle

    return <Pressable onPress={onPress}>
        <View style={[baseViewStyle, selectedViewStyle, styles.defaultViewStyle]}>
            <Text style={[baseTextStyle, selectedTextStyle]}>{label}</Text>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    defaultOnViewStyle: {
        backgroundColor: Colors.tint,
        width: "10%",
        borderRadius: 5
    },
    defaultOffViewStyle: {
        backgroundColor: "#E5E5E5",
        width: "10%",
        borderRadius: 5
    },
    defaultOnTextStyle: {
        color: Colors.lightWhite,
        fontFamily: "Teachers-SemiBold",
    },
    defaultOffTextStyle: {
        color: "#808080",
        fontFamily: "Teachers-SemiBold",
    },
    defaultViewStyle: {
        alignItems: "center",
        justifyContent: "center",
    }
})