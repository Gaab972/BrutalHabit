import { StyleSheet } from "react-native";
import ToggleButton from "./ToggleButton";
import Colors from "../Constants/Colors";

type Props = {
    label: string,
    selected: boolean,
    onPress: () => void,
}

export default function DayCell({label, selected, onPress} : Props)
{
    return <ToggleButton 
    label={label} 
    selected={selected} 
    onPress={onPress} 
    baseViewStyle={styles.BaseViewStyle}
    onViewStyle={styles.OnViewStyle}
    offViewStyle={styles.OffViewStyle} 
    baseTextStyle={styles.BaseTextStyle}
    onTextStyle={styles.OnTextStyle}
    offTextStyle={styles.OffTextStyle}/>
}

const styles = StyleSheet.create({
  BaseViewStyle: {
    width: 36,
    borderRadius: 5,
  },
  BaseTextStyle: {
    fontFamily: "Teachers-SemiBold",
    fontSize: 12,
    textAlign: "center",
    textAlignVertical: "center",
    marginVertical: 9,
  },
  OnViewStyle: {
    backgroundColor: Colors.tint,
    elevation: 5,
  },
  OffViewStyle: {
    backgroundColor: "#E5E5E5",
  },
  OnTextStyle: {
    color: Colors.lightWhite,
  },
  OffTextStyle: {
    color: "#808080",
  },
});