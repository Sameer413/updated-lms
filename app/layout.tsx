"use client";
// import type { Metadata } from "next";
import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../utils/themeProvider";
import { Provider } from "react-redux";
import store from "@/redux/store";
import ModalProvider from "@/components/ui/ModalProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 h-full`}
      >
        <Provider store={store}>
          <ModalProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </ModalProvider>
        </Provider>
      </body>
    </html>
  );
}
