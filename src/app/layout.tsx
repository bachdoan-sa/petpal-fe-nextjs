import Head from "next/head";
import { Metadata } from "next";
/*all css import*/
import "../../styles/main.css";
import "@/styles/_user.scss";
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapClient from "../components/bootstrapClient";
import AppProvider from "./app-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: 'Petpal',
  description: 'The official PETPAL, built with App Router.',
  icons: "assets/images/sm-logo.svg"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BootstrapClient />
        <AppProvider>
          {children}
        </AppProvider>
        <Toaster richColors position="bottom-left"/>
      </body>
      {/* <body className={`${inter.className} antialiased`}>{children}</body> */}
    </html>
  );
}

