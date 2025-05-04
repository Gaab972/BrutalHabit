import { StyleSheet, View, Text, Pressable } from "react-native";
import { Colors } from "../Constants/Colors";
import { useFonts } from "expo-font";
import Row from "./Row";
import { Link } from "expo-router";

export default function NewHabitCard()
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
        
      <Link href="../Screens/CreateHabitScreen" asChild>
        <Pressable style={{width: "100%", alignItems: "center"}}>
        <View style={styles.Background}>
            <Row>
              <View style={styles.PlusBackground}>
                <Text style={styles.Plus}>+</Text>
              </View>
              <Text style={styles.Name}>Add new</Text>
            </Row>
          </View>
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
        justifyContent: "center",
    },
    Name: {
        fontFamily: "Teachers-SemiBold",
        marginLeft: 11.5,
        fontSize: 22,
        color: Colors["tint"],
    },
    PlusBackground: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginLeft: 18.5,
        backgroundColor: Colors.tint,
        elevation: 5,
        borderColor: "#E97100",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    Plus: {
        fontSize: 26,
        color: Colors.greyWhite,
        textAlign: "center",
        marginTop: -4
    }
})