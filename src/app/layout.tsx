import Head from "next/head";
import { Metadata } from "next";
/*all css import*/
import "../../styles/main.css";
import "@/styles/custom.scss";
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapClient from "../components/bootstrapClient";
import AppProvider from "./app-provider";
import { Toaster } from "sonner";
import { Suspense } from "react";
import Loading from "./loading";

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
        <Suspense fallback={<Loading />}>


          <AppProvider>

            {children}

          </AppProvider>


        </Suspense >
        <Toaster richColors position="bottom-left" />
      </body>
      {/* <body className={`${inter.className} antialiased`}>{children}</body> */}
    </html>
  );
}

