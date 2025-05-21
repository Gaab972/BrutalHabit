import { CardForm } from "@stripe/stripe-react-native";
import { View, StyleSheet, ViewProps } from "react-native";

export default function PaymentCard({style} : ViewProps)
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
                borderColor: "#e0e0e0",
                backgroundColor: "#ffffff",
                borderRadius: 10,
                borderWidth: 1,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
    },
    cardForm: {
        height: 275,
        width: "90%"
    },
})