import "../styles/App.css";
import Header from "../components/header";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import ContactForm from "../components/contactform";
import { setupMediaPlaceholders } from "../utils/mediaPlaceholder";

export default function App({ Component, pageProps }: AppProps) {
  // One observer for the whole app, so media on any page — including the art
  // lightbox, which mounts on tap — gets a placeholder while it loads.
  useEffect(() => setupMediaPlaceholders(), []);

  return (
    <>
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
