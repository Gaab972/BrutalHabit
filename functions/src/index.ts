import * as admin from "firebase-admin";
import Stripe from "stripe";
import dotenv from "dotenv";
import { onRequest } from "firebase-functions/v2/https";

// 🔐 Initialise Firebase Admin SDK
admin.initializeApp();
dotenv.config();

// eslint-disable-next-line max-len
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export const createSetupIntent = onRequest({ region:"europe-west1" }, async (req, res) => {
  try {
    const {userId} = req.body;

    if (!userId) {
      res.status(400).send("Missing userId");
      return;
    }

    // 🔍 On récupère l'utilisateur dans Firestore
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userId).get();
    const userData = userDoc.data();

    let customerId = userData?.stripeCustomerId;

    // 👤 Si pas encore de customer Stripe, on le crée
    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: {firebaseUID: userId},
      });

      customerId = customer.id;
      if (!userDoc.exists) {
        await admin.firestore().collection("users").doc(userId).set({
          stripeCustomerId: customerId,
        });
      } else {
        await userDoc.ref.update({stripeCustomerId: customerId});
      }
    }

    // 🧾 On crée un SetupIntent
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
    });

    res.status(200).json({clientSecret: setupIntent.client_secret});
  } catch (err) {
    console.error("Erreur createSetupIntent:", err);
    res.status(500).send("Internal server error");
  }
});

export const storeCardDetails = onRequest({ region:"europe-west1" }, async (req, res) => {
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
      cardBrand: brand,
      cardLast4: last4,
    })

    res.status(200).send("Card details stored successfully")
  } catch (err) {
    console.error("Erreur storeCardDetails:", err);
    res.status(500).send("Internal server error");
  }
});
