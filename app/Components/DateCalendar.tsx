import { FlatList, StyleSheet, View } from "react-native";
import DateCell, { DateCellWidth } from "./DateCell";
import { useEffect, useRef, useState } from "react";
import { GetDateWithDaysOffset } from "../Functions/Format";


type Props = {
    onDateSelected : (SelectedDate : Date) => void;
}

export default function DateCalendar({onDateSelected} : Props) {
  const numberOfDaysBefore = 30;
  const numberOfDaysAfter = 30;
  const todayIndex = 30;
  const [selectedIndex, setSelectedIndex] = useState(todayIndex)

  const dates = new Array<Date>(numberOfDaysBefore + numberOfDaysAfter + 1);
  for (var i = 0; i < dates.length; i++) {
    dates[i] = GetDateWithDaysOffset(i - numberOfDaysBefore);
  }

  const datesFlatListRef = useRef<FlatList<Date>>(null);
  const [isDatesFlatListReady, setIsFlatListReacdy] = useState(false);

  useEffect(() => {
    if (!isDatesFlatListReady) return;

    datesFlatListRef.current?.scrollToIndex({
      index: numberOfDaysBefore,
      animated: false,
    });
  }, [isDatesFlatListReady]);

  return (
    <View style={styles.ViewStyle}>
      <FlatList
        ref={datesFlatListRef}
        horizontal
        data={dates}
        keyExtractor={(item) => item.toDateString()}
        renderItem={(item) => (
          <DateCell
            date={item.item}
            isToday={item.index == todayIndex}
            index={item.index}
            isSelected={item.index == selectedIndex}
            onSelected={OnDateSelected}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ContentContainer}
        onLayout={() => {
          setIsFlatListReacdy(true);
        }}
        style={styles.FlatList}
        getItemLayout={(_, index) => ({
          length: DateCellWidth + 7, //7 => gap
          offset: index * (DateCellWidth + 7),
          index,
        })}
      ></FlatList>
    </View>
  );

  function OnDateSelected(selectedIndex: number) {
    setSelectedIndex(selectedIndex)
    onDateSelected(dates[selectedIndex])
  }
}

const styles = StyleSheet.create({
    ViewStyle: {
        marginTop: 34,
        height: 48
    },
    ContentContainer: {
        gap: 7,
        paddingHorizontal: 20
    },
    FlatList: {
        overflow: "visible"
    }
})
