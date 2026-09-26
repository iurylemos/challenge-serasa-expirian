import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import type { JSX } from "react";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oferta Express",
  description: "Criado para facilitar o fluxo de pagamento",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">): JSX.Element {
  return (
    <html lang="pt-BR" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
