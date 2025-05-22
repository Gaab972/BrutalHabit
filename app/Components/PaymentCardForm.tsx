import { CardForm } from "@stripe/stripe-react-native";
import { View, StyleSheet, ViewProps, Alert } from "react-native";
import Colors from "../Constants/Colors";

export default function PaymentCardForm({style} : ViewProps)
{
    return (
        <View style={[styles.container, style]}>
            <CardForm
            style={styles.cardForm}   
            placeholders={{
                number: "Card number",
                expiration: "MM/YY",
                cvc: "CVC",
                postalCode: "Postal code",
                }}   
            cardStyle={{
                textColor: "#000000",
                placeholderColor: "#999999",
                fontSize: 16,
                fontFamily: "TeachersMedium",
                backgroundColor: Colors.lightWhite,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#e0e0e0",
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 265,
        alignItems: "center",
    },
    cardForm: {
        height: 265,
        width: "90%",
    },
})
