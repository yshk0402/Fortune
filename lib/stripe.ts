import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is required");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-12-15.clover",
});

export default stripe;
