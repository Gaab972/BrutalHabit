import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Colors from "../Constants/Colors";
import Row from "../Components/Row";
import Checkbox from "../Components/Checkbox";
import { useState } from "react";
import PaymentCard from "../Components/PaymentCard";

export default function BrutalModeScreen()
{
    const [isAuthtorize, setIsAuthorize] = useState(false);

    return (
    <ScrollView style={styles.Container} contentContainerStyle={styles.Content} keyboardShouldPersistTaps={true}> 
        <Row style={styles.RowTitle}>
          <Image source={require("@/assets/images/Skull.png")} style={styles.SkullIcon}/>
            <Text style={styles.Title}>Brutal Mode</Text>
            
        </Row>
        <Text style={styles.ParagraphTitle}>How does it work?</Text>
        <Text style={styles.ParagraphText}>
            This mode can be activated for each habit. Once activated, you can set an amount in €. {"\n\n"}
            If you fail to complete your habit, based on the frequency you set, this amount will be debited from your bank account. {"\n\n"}
            You can deactivate the brutal mode at any time.
        </Text>
        <Text style={styles.ParagraphTitle}>Authorisation</Text>
        <Row>
            <Checkbox isChecked={isAuthtorize} onPress={() => setIsAuthorize((prev) => !prev)} disabled={false}/>
            <Text style={styles.ParagraphText}>
            I authorize the Brutal Habits app to debit the amount associated with my Brutal Habits habit from the payment method provided below.
            </Text>
        </Row>
        
        <Text style={styles.ParagraphTitle}>Payment method</Text>
     
        <PaymentCard style={styles.paymentCard}/>

    </ScrollView>
    )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors["greyWhite"],
  },
  Content: {
    flexGrow: 1,
  },
  RowTitle: {
    marginLeft: 10,
    marginTop: 57,
  },
  Title: {
    fontSize: 32,
    alignSelf: "center",
    fontFamily: "Teachers-Bold",
    color: Colors["tint"],
    textAlignVertical: "center",
  },
  SkullIcon: {
    width: 48,
    height: 48,
  },
  ParagraphTitle: {
    fontSize: 20,
    fontFamily: "Teachers-SemiBold",
    marginVertical: 25,
    marginLeft: 22,
  },
  ParagraphText: {
    marginLeft: 22,
    fontSize: 16,
    fontFamily: "TeachersMedium",
  },
  paymentCard: {
    marginBottom: 20,
  }
});