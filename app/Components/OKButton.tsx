import { Image, StyleSheet, View, ViewProps, Text, TouchableOpacity, ImageSourcePropType } from "react-native";
import Colors from "../Constants/Colors";
import { useFonts } from "expo-font";

type CommonProps = ViewProps & {
    onPress: () => void;
}

type TextButton = {
    text: string,
    icon?: never,
}

type IconButton = {
    icon: ImageSourcePropType
    text?: never;
}

type Props = CommonProps & (TextButton | IconButton)

export default function OKButton({style, text, icon, onPress}: Props)
{
    const [fontsLoaded] = useFonts({
        'Teachers-Bold': require('../../assets/fonts/Teachers-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return <TouchableOpacity style={[styles.Pressable, style]} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.MainView}>
            {text && <Text style={styles.Text}>{text}</Text>}
            {icon && <Image source={icon} style={{ width:32, height:32}}/>}
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