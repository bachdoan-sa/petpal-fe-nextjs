import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router.js";
/*all css import*/
import "../../styles/main.css";
import "../../styles/theme.scss";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("../../public/assets/js/bootstrap.bundle.min.js");
  });
  return (
    <>
      <Head>
        <title>Petpal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="assets/images/sm-logo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
