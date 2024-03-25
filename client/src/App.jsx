import { Layout } from "./Layout";
import { ContextProvider } from "./provider/ContextProvider";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <>
      <ContextProvider>
        <ScrollToTop />
        <Layout />
      </ContextProvider>
    </>
  );
}

export default App;
