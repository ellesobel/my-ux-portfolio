import "../styles/App.css";
import Header from "../components/header";

import type { AppProps } from "next/app";
import ContactForm from "../components/contactform";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <body></body>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        <ContactForm />
      </footer>
    </>
  );
}
