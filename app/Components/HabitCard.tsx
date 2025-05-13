import { StyleSheet, View, Text, Image, ViewProps, Pressable } from "react-native";
import { Colors } from "../Constants/Colors";
import { Habit } from "../Functions/Services/Service_Habit";
import HabitCardTemplate from "./HabitCardTemplate";
import { Link } from "expo-router";


type Props = Habit & {
    id: string,
    name: string;
    streak: number;
}

export default function HabitCard({id, name, streak, ...rest} : Props)
{
    return (
      
      <Link href={{pathname: "/Screens/HabitDetailScreen", params: { id: id } }} asChild>
      <Pressable>
        <HabitCardTemplate {...rest}>
        <Text style={styles.Name}>{name}</Text>
        <View style={styles.StreakContainer}>
          <Text style={styles.Streak}>{streak}</Text>
          <Image
            source={require("@/assets/images/flamme.png")}
            style={{ width: 30, height: 30 }}
          />
        </View>
        </HabitCardTemplate>
      </Pressable>
      </Link>
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
        justifyContent: "space-between"
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