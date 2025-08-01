// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '@/components/Toastify'
import { AuthProvider } from "@/context/authContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>

          <Header />
          {children}
          <Toastify />

        </AuthProvider>
      </body>
    </html>
  );
}
