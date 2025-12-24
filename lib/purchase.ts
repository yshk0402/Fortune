import stripe from "./stripe";

const verifiedSessions = new Set<string>();

export function markSessionComplete(sessionId: string) {
  if (!sessionId) {
    return;
  }
  verifiedSessions.add(sessionId);
}

export async function verifyPurchase(sessionId: string): Promise<boolean> {
  if (!sessionId) {
    return false;
  }
  if (verifiedSessions.has(sessionId)) {
    return true;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const isPaid = session.payment_status === "paid" && session.status === "complete";
    if (isPaid) {
      verifiedSessions.add(sessionId);
    }
    return isPaid;
  } catch (error) {
    console.error("Failed to verify Stripe session", error);
    return false;
  }
}
