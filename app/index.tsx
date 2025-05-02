import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "./Constants/Colors";
import { useFonts } from 'expo-font';
import DateCell from "./Components/DateCell";
import { GetDateWithDaysOffset, GetMonthName } from "./Functions/Format";
import { useEffect, useRef, useState } from "react";
import HabitCheckCard from "./Components/HabitCheckCard";

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Teachers-Bold': require('../assets/fonts/Teachers-Bold.ttf'),
  });

  var dateCalendarGap = 7;
  const numberOfDaysBefore = 30;
  const numberOfDaysAfter = 30;
  const todayIndex = 30;

  const dates = new Array<Date>(numberOfDaysBefore + numberOfDaysAfter + 1);
  for (var i = 0; i < dates.length; i++)
  {
    dates[i] = GetDateWithDaysOffset(i - numberOfDaysBefore)
  }

  const datesFlatListRef = useRef<FlatList<Date>>(null);
  const [isDatesFlatListReady, setIsFlatListReacdy] = useState(false);

  useEffect(() => {
    if (!isDatesFlatListReady) return;

    datesFlatListRef.current?.scrollToIndex({index: numberOfDaysBefore, animated: false})
  }, [isDatesFlatListReady])

  const [selectedIndex, setSelectedIndex] = useState(todayIndex);
  const selectedDate = dates[selectedIndex];

    if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.MainBackground}>
      <Text style={styles.Title}>{GetDateTitle(selectedDate)}</Text>

      <View style={[styles.RowStyle, {height: 48}]}>
        <FlatList
          ref = {datesFlatListRef}
          horizontal
          data={dates}
          keyExtractor={(item) => item.toDateString()}
          renderItem={(item) => 
          <DateCell 
            date={item.item} 
            isToday={item.index == todayIndex} 
            index={item.index} 
            isSelected={item.index == selectedIndex} 
            onSelected={setSelectedIndex}/>}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[{ gap: dateCalendarGap, paddingHorizontal: 20}]}
          onLayout={() => {
            setIsFlatListReacdy(true);
          }}
          style= {{overflow: "visible"}}
          getItemLayout={(_, index) => ({
            length: 45,
            offset: index * 45,
            index,
          })}
          >
        </FlatList>
      </View>

      <View style={styles.HabitBackground}>
          {/* <HabitCheckCard name="Méditation" streak={10} isChecked={false}/>
          <HabitCheckCard name="Méditation" streak={10} isChecked={false}/>
          <HabitCheckCard name="Méditation" streak={10} isChecked={false}/>
          <HabitCheckCard name="Méditation" streak={10} isChecked={false}/>
          <HabitCheckCard name="Méditation" streak={10} isChecked={false}/> */}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  MainBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors["greyWhite"],
  },
  Date: {
    width: "100%",
    height: 48,
    marginTop: 43,
    elevation: 20,
    borderRadius: 30,
    backgroundColor: Colors["greyWhite"]
  },
  DateSelector: {
  },
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
  Title: {
    fontSize: 32,
    width: "100%",
    alignSelf: "flex-start",
    marginLeft: 31,
    marginTop: 57,
    fontFamily: "Teachers-Bold",
    color: Colors["tint"]
  },
  RowStyle : {
    marginTop: 34,
  },
})

function GetDateTitle(date: Date) : string
{
    var today = new Date();
    var isToday = date.getDate() == today.getDate() 
    && date.getMonth() == today.getMonth() 
    && date.getFullYear() == today.getFullYear();

    if (isToday) return "Aujourd'hui";
    return `${date.getDate().toString().padStart(2, '0')} ${GetMonthName(date)} ${date.getFullYear()}`
}
