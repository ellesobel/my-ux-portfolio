import "../styles/App.css";
import Header from "../components/header";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import ContactForm from "../components/contactform";
import { setupMediaPlaceholders } from "../utils/mediaPlaceholder";

export default function App({ Component, pageProps }: AppProps) {
  // One observer for the whole app, so media on any page — including the art
  // lightbox, which mounts on tap — gets a placeholder while it loads.
  useEffect(() => setupMediaPlaceholders(), []);

  return (
    <>
      <Head>
        {/* Without initial-scale, iOS Safari shrinks the whole page to fit any
            content wider than the screen — which showed up as a strip of dead
            space down the right-hand side on a phone. */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        <ContactForm />
      </footer>
    </>
  );
}
