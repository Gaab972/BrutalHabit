import { Pressable, StyleSheet, Text, View } from "react-native";
import { GetDayName } from "../Functions/Format";
import { Colors } from "../Constants/Colors";
import { useFonts } from "expo-font";

type Props = {
    date: Date,
    isToday: boolean,
    isSelected: boolean,
    index: number,
    onSelected: (index: number) => void,
}

export const DateCalendarWidth = 38;

export default function DateCalendar({date, isToday, isSelected, index, onSelected} : Props) {
    var today = new Date();
    var isToday = date.getDate() == today.getDate() 
    && date.getMonth() == today.getMonth() 
    && date.getFullYear() == today.getFullYear();

    var numberColor = isToday ? Colors.tint : Colors.black;
    var numberBackgroundColor = isSelected ? Colors.tintLight : Colors.lightWhite;

    var dayName = GetDayName(date).slice(0, 3);
    var dayNumber = date.getDate();

    const [fontsLoaded] = useFonts({
        'TeachersMedium': require('../../assets/fonts/TeachersMedium.ttf'),
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return  <Pressable onPress={() => onSelected(index)}>
            <View style={styles.Background}>
                <Text style={styles.DayName}>{dayName}</Text>
                <View style={[styles.NumberBackground, {backgroundColor: numberBackgroundColor}]}>
                    <Text style={[styles.DayNumber, {color: numberColor}]}>{dayNumber}</Text>
                </View>
            </View>
        </Pressable>
}

const styles = StyleSheet.create({
    Background: {
        backgroundColor: Colors.tint,
        width: DateCalendarWidth,
        height: 48,
        borderRadius: 6.25,
        elevation: 10,
        alignItems: "center",
    },
    DayName: {
        fontFamily: "TeachersMedium",
        textAlign: "center",
        color: Colors.lightWhite,
        fontSize: 13,
        marginTop: 2,
        height: 14
    },
    NumberBackground : {
        width: DateCalendarWidth + 0.1,
        height: 28,
        borderRadius: 6.25,
        marginTop: 4.1,
        justifyContent: "center",
        alignItems: "center"
    },
    DayNumber: {
        fontFamily: "TeachersMedium",
        textAlign: "center",
        color: Colors.black,
    }
})