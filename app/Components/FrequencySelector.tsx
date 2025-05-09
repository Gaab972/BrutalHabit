import Row from "./Row";
import DayCell from "./DayCell";
import { StyleSheet } from "react-native";

type Props = {
    selectedDaysIndex: number[],
    SetSelectedDaysIndex: (selectedDays: number[]) => void;
    canInteract: boolean;
}

export default function FrequencySelector({selectedDaysIndex, SetSelectedDaysIndex, canInteract} : Props) {
  return (
    <Row style={styles.FrequencyDays} gap={6}>
      {Array.from({ length: 7 }, (_, i) => (
        <DayCell
          key={i}
          label={GetDayLabel(i)}
          selected={selectedDaysIndex.includes(i)}
          onPress={() => OnPressDayCell(i)}
          canInteract={canInteract}
        />
      ))}
    </Row>
  );

  function OnPressDayCell(index: number) {
    if (!canInteract) return false;

    var newSelectedDays = selectedDaysIndex.includes(index) 
    ? selectedDaysIndex.filter((i) => i !== index) 
    : [...selectedDaysIndex, index];
    
    SetSelectedDaysIndex(newSelectedDays);
  }

  function GetDayLabel(index: number): string {
    switch (index) {
      case 0:
        return "Mon";
      case 1:
        return "Tue";
      case 2:
        return "Wed";
      case 3:
        return "Thu";
      case 4:
        return "Fri";
      case 5:
        return "Sat";
      case 6:
        return "Sun";
      default:
        return "ERR";
    }
  }
}

const styles = StyleSheet.create({
  FrequencyDays: {
    width: "100%",
    marginTop: 17,
    marginLeft: 42,
  },
});
