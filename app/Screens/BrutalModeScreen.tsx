import { Text, View, StyleSheet, Image, ScrollView, Modal, Alert } from "react-native";
import Colors from "../Constants/Colors";
import Row from "../Components/Row";
import Checkbox from "../Components/Checkbox";
import { useEffect, useState } from "react";
import PaymentCardForm from "../Components/PaymentCardForm";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import PaymentCard, { CardInfo } from "../Components/PaymentCard";
import OKButton from "../Components/OKButton";
import { useStripe } from "@stripe/stripe-react-native";

export default function BrutalModeScreen()
{
    const { confirmSetupIntent } = useStripe();
    const handleSaveCard = async () => {
        try {
            const userId = "user_default";
            var response = await fetch("https://createsetupintent-3ir4utrw3a-ew.a.run.app", {
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

            const userRef = doc(database, "users", userId);
            await updateDoc(userRef, {
                paymentMethodId,
            });

            response = await fetch("https://storecarddetails-3ir4utrw3a-ew.a.run.app", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    userId: userId,
                    paymentMethodId: paymentMethodId,
                })
            })
            
            if (!response.ok) throw new Error("Backend Firebase createSetupIntent function error")

        } catch (err: any) {
            Alert.alert("Error", err.message || "ERROR");
        }
    }

    const [isAuthtorize, setIsAuthorize] = useState(false);
    const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
    const [cardInfo, setCardInfo] = useState< CardInfo | null>(null)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchUser = async () => {
        const userId = "user_default";
        const userRef = doc(database, "users", userId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        if (userData == undefined) return;

        const userDoc = {
          userId: userData.userId,
          stripeCustomerId: userData.stripeCustomerId,
          paymentMethodId: userData.paymentMethodId,
          cardBrand: userData.cardBrand,
          cardLast4: userData.cardLast4,
          cardExp_month: userData.cardExp_month,
          cardExp_year: userData.cardExp_year,
        }

        if (userDoc.paymentMethodId && userDoc.cardBrand && userDoc.cardLast4 && userDoc.cardExp_month && userDoc.cardExp_year) {
          setCardInfo({ cardBrand: userDoc.cardBrand, cardLast4: userDoc.cardLast4, exp_month: userDoc.cardExp_month, exp_year: userDoc.cardExp_year })
          setHasPaymentMethod(true);
        }
      }

      fetchUser();
    }, [hasPaymentMethod])

    return (
      <>
      <ScrollView style={styles.Container} contentContainerStyle={styles.Content} keyboardShouldPersistTaps="always"> 
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
        <View style={[styles.horizontalSeparator]}/>
        <Text style={[styles.ParagraphTitle]}>Authorisation</Text>
        <Row>
            <Checkbox style={styles.checkboxView} isChecked={isAuthtorize} onPress={onPressAuthoriseCheckbox} disabled={false}/>
            <Text style={styles.AuthorizeParagraphText}>
                 {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}I authorise the Brutal Habits app to debit the amount associated with my habits from the payment method provided below.
            </Text>
        </Row>
        <View style={[styles.horizontalSeparator]}/>
        <Text style={[styles.ParagraphTitle, {marginBottom: 15}]}>Payment method</Text>

        {/* <PaymentCardForm style={styles.paymentCard}/> */}
        {(!hasPaymentMethod || !cardInfo) && <PaymentCardForm style={styles.paymentCard}/>}
        {(!hasPaymentMethod || !cardInfo) && <OKButton style={styles.saveButton} text="Save card" onPress={onPressSave}/>}
        {hasPaymentMethod && cardInfo && <PaymentCard cardBrand={cardInfo.cardBrand} cardLast4={cardInfo.cardLast4} exp_month={cardInfo.exp_month} exp_year={cardInfo.exp_year}/>}
        {hasPaymentMethod && cardInfo && <Row style={styles.buttonContainer}>
          <OKButton icon={require("@/assets/images/Trashcan.png")} onPress={onPressDelete}/>
        </Row>}
        
      </ScrollView>
      <Modal visible={isDeleteModalVisible} transparent onRequestClose={() => setIsDeleteModalVisible(false)} animationType="fade">
        <View style={styles.DeleteModalViewPopup}>
          <View style={styles.DeleteModalView}>
              <Text style={styles.DeleteModalText}>Are you sure you want to delete your payment card?</Text>
              <Row style={{justifyContent: "center", marginTop: 30}} gap={60}>
                <OKButton text="Yes" onPress={deletePaymentCard}/>
                <OKButton text="No" onPress={() => setIsDeleteModalVisible(false)}/>
              </Row>
          </View>
        </View>
      </Modal>
      <Modal visible={isLoading} transparent animationType="fade">
        <View style={styles.loadingModalBackdrop}>
        </View>
      </Modal>
      </>
    )

    function onPressAuthoriseCheckbox()
    {
      const userId = "user_default";
      setIsAuthorize((prev) => !prev);
      const userRef = doc(database, "users", userId)
      updateDoc(userRef, {
        paymentAuthorise : !isAuthtorize,
      })
    }

    function onPressSave()
    {
      const saveCard = async () => {
        setIsLoading(true);
        await handleSaveCard();
        setHasPaymentMethod(true);
        setIsLoading(false);
      }

      saveCard();
    }

    function onPressDelete()
    {
      setIsDeleteModalVisible(true);
    }

    function deletePaymentCard()
    {
      const userId = "user_default";
      const userRef = doc(database, "users", userId);

      updateDoc(userRef, {
        paymentMethodId: null,
        cardBrand: null,
        cardLast4: null,
        cardExp_month: null,
        cardExp_year: null,
      });

      setHasPaymentMethod(false);
      setCardInfo(null);
      setIsDeleteModalVisible(false);
    }
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
    marginBottom: 25,
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
    marginLeft: 22,
    marginBottom: 14,
  },
  ParagraphText: {
    marginLeft: 22,
    fontSize: 16,
    fontFamily: "TeachersMedium",
  },
  AuthorizeParagraphText: {
    marginLeft: 22,
    fontSize: 16,
    fontFamily: "TeachersMedium",
    lineHeight: 24,
  },
  paymentCard: {
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    marginTop: 30,
  },
  saveButton: 
  {
    width: "40%",
    alignSelf: "center",
    marginBottom: 20
  },
  DeleteModalViewPopup: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  DeleteModalView: {
    width: "80%",
    height: "20%",
    backgroundColor: Colors.lightWhite,
    // borderWidth: 3,
    elevation: 10,
    // borderColor: Colors.tint,
    borderRadius: 10,

  },
  DeleteModalText: {
    fontSize: 14,
    marginTop: 20,
    fontFamily: "Teachers-SemiBold",
    textAlign: "center",
  },
  loadingModalBackdrop: {
    flex: 1,
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
  checkboxView : {
    position: "absolute",
    marginLeft: 20,
    alignSelf: "flex-start",
    zIndex: 1,
  },
  horizontalSeparator: {
    height: 2,
    width: "80%",
    backgroundColor: Colors.black,
    opacity: 0.3,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 1,
    alignSelf: "center"
  }
});
