import { Pressable, StyleSheet, View, ViewProps, Text, TouchableOpacity } from "react-native";
import Colors from "../Constants/Colors";
import { useFonts } from "expo-font";

type Props = ViewProps & {
    text: string,
    onPress: () => void;
}

export default function OKButton({style, text, onPress}: Props)
{
    const [fontsLoaded] = useFonts({
        'Teachers-Bold': require('../../assets/fonts/Teachers-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return <TouchableOpacity style={[styles.Pressable, style]} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.MainView}>
            <Text style={styles.Text}>{text}</Text>
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