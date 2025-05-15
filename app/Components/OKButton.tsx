import { Image, StyleSheet, View, ViewProps, Text, TouchableOpacity, ImageSourcePropType } from "react-native";
import Colors from "../Constants/Colors";

type Props = ViewProps & {
    onPress: () => void;
    color?: string;
    text?: string,
    icon?: ImageSourcePropType,
    iconColor?: string,
}

export default function OKButton({style, color, text, icon, iconColor, onPress}: Props)
{
    return <TouchableOpacity style={[styles.Pressable, style]} onPress={onPress} activeOpacity={0.7}>
        <View style={[styles.MainView, { backgroundColor: color ?? Colors.tint }]}>
            {text && <Text style={styles.Text}>{text}</Text>}
            {icon && <Image source={icon} style={{ width:32, height:32}} tintColor={iconColor ?? ""}/>}
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    Pressable: {
        height: 45,
        width: 54,
    },
    MainView: {
        flex: 1,
        backgroundColor: Colors.tint,
        borderRadius: 20,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    Text: {
        color: Colors.lightWhite,
        fontFamily: "Teachers-Bold",
        fontSize: 18,
    }
})