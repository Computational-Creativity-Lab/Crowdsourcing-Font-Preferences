import "/styles/_globals.css";
import "/styles/_reset.css";
import "/styles/_typography.css";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />;
    </AnimatePresence>
  );
}

export default MyApp;
