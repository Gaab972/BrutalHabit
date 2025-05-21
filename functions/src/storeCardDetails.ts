import * as functions from "firebase-functions";
import Stripe from "stripe";
import { admin } from "./firebaseAdmin";
import * as dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export const storeCardDetails = functions.https.onRequest(async (req, res) => {
  try {
    const { userId, paymentMethodId } = req.body;

    if (!userId || !paymentMethodId) {
      res.status(400).send("Missing userId or paymentMethodId");
      return;
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    const brand = paymentMethod.card?.brand;
    const last4 = paymentMethod.card?.last4;

    if (!brand || ! last4)
    {
      res.status(400).send("Invalid payment method data");
      return;
    }

    const userRef = admin.firestore().collection("users").doc(userId);
    await userRef.update({
      paymentMethodId,
      cardBrand: brand,
      cardLast4: last4,
    })

    res.status(200).send("Card details stored successfully")
  } catch (err) {
    console.error("Erreur storeCardDetails:", err);
    res.status(500).send("Internal server error");
  }
});