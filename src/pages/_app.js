import "/styles/_globals.css";
import "/styles/_reset.css";
import "/styles/_typography.css";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Ssr from "../components/Ssr";

function MyApp({ Component, pageProps }) {
  return (
    <Ssr>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />;
      </AnimatePresence>
    </Ssr>
  );
}

export default MyApp;
