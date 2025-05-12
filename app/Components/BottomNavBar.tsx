import { Image, Pressable, StyleSheet, View } from "react-native";
import Row from "./Row";
import Colors from "../Constants/Colors";
import { useRouter } from "expo-router";


export type PageType = "DailyHabits" | "AllHabits"

type Props = {
    selectedPage: PageType;
}

export default function BottomNavBar({selectedPage}: Props)
{
    const router = useRouter();

    const dailyHabitsStyle = selectedPage == "DailyHabits" ? styles.selectedPage : styles.defaultPage;
    const allHabitsStyle = selectedPage == "DailyHabits" ? styles.defaultPage : styles.selectedPage;
    const dailyHabitsIconStyle = selectedPage == "DailyHabits" ? styles.selectedIcon : styles.defaultIcon;
    const allHabitsIconStyle = selectedPage == "DailyHabits" ? styles.defaultIcon : styles.selectedIcon;

    return <Row style={styles.container} gap={18}>
        <Pressable onPress={() => router.push("/Screens/DailyHabitsScreen")}>
            <View style={dailyHabitsStyle}>
                <Image
                source={require("@/assets/images/CalendarWhite.png")}
                style={dailyHabitsIconStyle}
            />
            </View>
        </Pressable>
        
        <Pressable onPress={() => router.push("/Screens/AllHabitsScreen")}>
            <View style={allHabitsStyle}>
                <Image
                source={require("@/assets/images/TodolistWhite.png")}
                style={allHabitsIconStyle}
            />
            </View>
        </Pressable>
    </Row>
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 75,
        alignSelf: "center",
        position: "absolute",
        bottom: 10,
        borderRadius: 30,
        backgroundColor: Colors.lightWhite,
        justifyContent: "center",
    },
    defaultPage: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        justifyContent: "center",
        alignItems: "center",
    },
    defaultIcon: {
        width: 32, height: 32, tintColor: Colors.tintLight
    },
    selectedPage: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.tintLight,
    },
    selectedIcon: {
        width: 32, height: 32, tintColor: Colors.tint
    }
})