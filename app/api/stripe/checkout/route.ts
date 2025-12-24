import { NextResponse } from "next/server";
import stripe from "../../../../lib/stripe";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const priceId = process.env.STRIPE_PRICE_ID;

if (!siteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL is required");
}
if (!priceId) {
  throw new Error("STRIPE_PRICE_ID is required");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dob = body.dob?.trim();
    const mbti = body.mbti?.toUpperCase()?.trim();
    if (!dob || !mbti) {
      return NextResponse.json({ error: "生年月日とMBTIを送信してください" }, { status: 400 });
    }

    const successUrl = `${siteUrl}/result/paid?session_id={CHECKOUT_SESSION_ID}&dob=${encodeURIComponent(
      dob,
    )}&mbti=${encodeURIComponent(mbti)}`;
    const cancelUrl = `${siteUrl}/result/free?dob=${encodeURIComponent(dob)}&mbti=${encodeURIComponent(mbti)}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        dob,
        mbti,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout creation failed", error);
    return NextResponse.json({ error: "決済セッションの作成に失敗しました" }, { status: 500 });
  }
}
