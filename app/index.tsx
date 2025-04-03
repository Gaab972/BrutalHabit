import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "./Constants/Colors";
import { useFonts } from 'expo-font';
import DateCalendar, { DateCalendarWidth } from "./Components/DateCalendar";
import { GetDateWithDaysOffset } from "./Functions/Format";
import { useRef, useState } from "react";

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Teachers-Bold': require('../assets/fonts/Teachers-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  var screenWidth = Dimensions.get("window").width;
  var dateCalendarGap = 7;
  var dateCalendarWidth = DateCalendarWidth + dateCalendarGap;
  var numberOfDateCalendar = Math.ceil(screenWidth / dateCalendarWidth)

  var [numberOfDaysBefore, setNumberOfDaysBefore] = useState(1)
  var [numberOfDaysAfter, setNumberOfDaysAfter] = useState(numberOfDateCalendar - 2)

  const beforeDateCalendarArray = Array.from({ length: numberOfDaysBefore });
  const afterDateCalendarArray = Array.from({ length: numberOfDaysAfter });

  const dateCalendarScroll = (e: {nativeEvent: {
    contentOffset: { x: number},
    contentSize: { width: number },
    layoutMeasurement: { width : number }}}) => {


      const scrollX = e.nativeEvent.contentOffset.x;
      const contentWidth = e.nativeEvent.contentSize.width;
      const containerWidth = e.nativeEvent.layoutMeasurement.width;
      const distanceFromEnd = contentWidth - (scrollX + containerWidth);
      if (distanceFromEnd < 10) {
        console.log("RIGHT LOAD")
        setNumberOfDaysAfter(prev => prev + 1)
      }

      if (scrollX < 10)
      {
        console.log("LEFT LOAD")
        setNumberOfDaysBefore(prev => prev + 1)
        e.nativeEvent.contentOffset.x = 11;
      }
  }

  return (
    <View style={styles.MainBackground}>
      <Text style={styles.Title}>Aujourd'hui</Text>

      <ScrollView
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
      </ScrollView>
      

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
  }
})
