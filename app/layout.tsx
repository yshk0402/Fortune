import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import LegalFooter from "../components/legal-footer";

export const metadata = {
  title: "六命占術×MBTI診断",
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
        <LegalFooter />
      </body>
    </html>
  );
}
