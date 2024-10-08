import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ThemeProvider } from "@/hooks/ThemeContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SquadCall",
  description: "Where Gamers Connect & Conquer",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">


      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: '/icons/squadcall-logo.svg',
            socialButtonsVariant: 'iconButton'
          },
          variables: {
            colorText: '#FFF',
            colorPrimary: '#0E78F9',
            colorBackground: '#1C1F2E',
            colorInputText: '#FFF',
            colorInputBackground: '#232a41'

          }
        }}>
        <body className={`${inter.className} bg-dark-2`}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </ClerkProvider>


    </html>

  );
}
