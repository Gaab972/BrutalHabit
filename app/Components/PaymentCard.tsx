import { Image, StyleSheet, Text, View, ViewProps } from "react-native"
import Colors from "../Constants/Colors"
import Row from "./Row"

export type CardInfo = {
    cardBrand: string,
    cardLast4: string,
    exp_month: number,
    exp_year: number,
}

type Props = ViewProps & CardInfo;

export default function PaymentCard({style, cardBrand, cardLast4, exp_month, exp_year}: Props)
{
    return <Row style={[styles.container, style]} gap={10}>
        <Text style={styles.textBrand}>💳 {cardBrand.toUpperCase()}</Text>
        <View style={styles.verticalSeparator}/>
        <Text style={[styles.text , {alignSelf: "center"}]}>**** **** **** {cardLast4.toUpperCase()}</Text>
        <View style={[styles.verticalSeparator, {marginLeft: "auto"}]}/>
        <Text style={[styles.text, {marginLeft: "auto"}]}>{exp_month.toString().padStart(2, '0')}/{exp_year}</Text>
    </Row>
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: "5%",
        maxHeight: 50,
        alignSelf: "center",
        borderRadius: 10,
        elevation: 2,
        backgroundColor: Colors.lightWhite,
        alignItems: "center",
        paddingHorizontal: 10,
        borderWidth: 1
    },
    textBrand: {
        fontSize: 14,
        fontFamily: "Teachers-SemiBold"
    },
    text: {
        fontSize: 14,
        fontFamily: "TeachersMedium"
    },
    icon: {
    width: 24,
    height: 24,
    },
    verticalSeparator: {
        width: 2,
        height: "70%",
        backgroundColor: Colors.black,
        opacity: 0.3,
        borderRadius: 1,
    }
})