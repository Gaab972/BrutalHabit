import { View, StyleSheet } from "react-native"
import HabitCheckCard from "./HabitCheckCard"
import { Colors } from "../Constants/Colors"

type Props = {
    date: Date,
}

export default function HabitCheckCardGroup({date} : Props)
{
    return <View style={styles.HabitBackground}>
              <HabitCheckCard name="Méditation" streak={10} isChecked={false}/>
              <HabitCheckCard name="Méditation" streak={10} isChecked={true}/>
          </View>
}

const styles = StyleSheet.create({
  HabitBackground: {
    flex: 1,
    width: "100%",
    marginTop: 43,
    elevation: 20,
    borderRadius: 30,
    backgroundColor: Colors["greyWhite"],
    paddingVertical: 22,
    gap: 10,
    alignItems: "center"
  },
})