import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "./Constants/Colors";
import { useFonts } from 'expo-font';
import DateCalendar, { DateCalendarWidth } from "./Components/DateCalendar";
import { GetDateWithDaysOffset } from "./Functions/Format";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Teachers-Bold': require('../assets/fonts/Teachers-Bold.ttf'),
  });



  var screenWidth = Dimensions.get("window").width;
  var dateCalendarGap = 7;
  var dateCalendarWidth = DateCalendarWidth + dateCalendarGap;
  var numberOfDateCalendar = Math.ceil(screenWidth / dateCalendarWidth)
  const numberOfDaysBefore = 30;
  const numberOfDaysAfter = 30;

  const dates = new Array(numberOfDaysBefore + numberOfDaysAfter + 1);
  for (var i = 0; i < dates.length; i++)
  {
    dates[i] = GetDateWithDaysOffset(i - numberOfDaysBefore)
  }

  const flatListRef = useRef<FlatList<Date>>(null);
  useEffect(() => {
    flatListRef.current?.scrollToIndex({index: numberOfDaysBefore, animated: false})
  }, [])

    if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.MainBackground}>
      <Text style={styles.Title}>Aujourd'hui</Text>
      
      <FlatList
      ref = {flatListRef}
      horizontal
      data={dates}
      keyExtractor={(item) => item.toDateString()}
      renderItem={(item) => <DateCalendar date={item.item}/>}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.RowStyle, { gap: dateCalendarGap, paddingHorizontal: 20}]}>

      </FlatList>

      {/* <ScrollView
        style= {{height: 48, backgroundColor: "#000000"}}
        horizontal
        scrollEventThrottle={16}
        onScroll={dateCalendarScroll}        
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.RowStyle, { gap: dateCalendarGap, paddingHorizontal: 20}]}
      >
        {beforeDateCalendarArray.map((_, i) => (<DateCalendar key={-beforeDateCalendarArray.length + i} date={GetDateWithDaysOffset(-beforeDateCalendarArray.length + i)}/>))}
        <DateCalendar date={new Date()}/>
        {afterDateCalendarArray.map((_, i) => (<DateCalendar key={i} date={GetDateWithDaysOffset(i + 1)}/>))}
      </ScrollView> */}
      

      <View style={styles.HabitBackground}>

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  MainBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors["greyWhite"]
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
    backgroundColor: Colors["greyWhite"]
  },
  Title: {
    fontSize: 32,
    width: 187,
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
