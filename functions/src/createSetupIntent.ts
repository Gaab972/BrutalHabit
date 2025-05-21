import * as functions from "firebase-functions";
import Stripe from "stripe";
import { admin } from "./firebaseAdmin";
import * as dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export const createSetupIntent = functions.https.onRequest(async (req, res) => {
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
