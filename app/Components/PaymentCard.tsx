import { CardForm, useStripe } from "@stripe/stripe-react-native";
import { View, StyleSheet, ViewProps, Alert } from "react-native";
import {
  updateDoc,
  doc,
} from 'firebase/firestore';

import { database } from "@/firebaseConfig";
import OKButton from "./OKButton";

export default function PaymentCard({style} : ViewProps)
{
    const { confirmSetupIntent } = useStripe();
    const handleSaveCard = async () => {
        try {
            const userId = "user_default";
            var response = await fetch("https://createsetupintent-3ir4utrw3a-uc.a.run.app", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userId })
            })

            if (!response.ok) throw new Error("Backend Firebase createSetupIntent function error")

            const { clientSecret } = await response.json();
            const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
                paymentMethodType: "Card",
            });

            if (error) {
                Alert.alert("Stripe error", error.message);
                return;
            }

            const paymentMethodId = setupIntent?.paymentMethod?.id;
            if (!paymentMethodId) throw new Error("No payment method recovered");

            response = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const userRef = doc(database, "users", userId);
            await updateDoc(userRef, {
                paymentMethodId,
            });
        } catch (err: any) {
            Alert.alert("Error", err.message || "ERROR");
        }
    }

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
            <OKButton style={{width: "40%"}} text="Save card" onPress={onPress}/>
        </View>
    )

    function onPress()
    {
        handleSaveCard();
    }

    
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


