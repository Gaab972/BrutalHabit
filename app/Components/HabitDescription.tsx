import { StyleSheet, Text, TextInput, View } from "react-native";
import HabitCardTemplate from "./HabitCardTemplate";
import Colors from "../Constants/Colors";
import Row from "./Row";
import { useFonts } from "expo-font";

type Props = {
  description: string;
  onDescriptionChange: (value: string) => void;
  editable: boolean;
};

export default function HabitDescription({description, onDescriptionChange, editable}: Props) {

    const [fontsLoaded] = useFonts({
        TeachersMedium: require("../../assets/fonts/TeachersMedium.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <HabitCardTemplate style={styles.HabitCard}>
        <View style={{ height: "100%", width: "100%"}}>
            <Row style={styles.AbsoluteView}>
                <Text style={styles.CategoryTitle}>{"Description"}</Text>
                {editable && <Text style={styles.Optional}>{"(optional)"}</Text>}
            </Row>
            <TextInput
            editable={editable}
            multiline
            placeholder={editable ? "My habit's description" : ""}
            style={styles.InputText}
            value={description}
            onChangeText={onDescriptionChange}
            />
        </View>
        </HabitCardTemplate>
  );
}

const styles = StyleSheet.create({
  HabitCard: {
    height: 200,
  },
  InputText: {
    fontFamily: "Teachers-Medium",
    marginHorizontal: 18.5,
    fontSize: 14,
    marginVertical: 10,
    flex: 1,
    textAlignVertical: "top",
  },
  AbsoluteView: {
    left: 21.5,
    top: -14,
    alignSelf: "flex-start",
    position: "absolute",
  },
  CategoryTitle: {
    fontSize: 16,
    fontFamily: "Teachers-Bold",
    fontWeight: "bold",
    textAlign: "center",
    color: Colors["black"],
    backgroundColor: Colors.greyWhite,
    opacity: 0.75,
  },
  Optional: {
    fontSize: 12,
    fontFamily: "Teachers-Medium",
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors["black"],
    marginLeft: 5,
    opacity: 0.5,
  }
});
