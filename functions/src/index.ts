export { createSetupIntent } from "./createSetupIntent";
export { storeCardDetails } from "./storeCardDetails";
import * as functions from "firebase-functions";

export const testFunction = functions.https.onRequest((req, res) => {
  res.send("Hello from testFunction");
});