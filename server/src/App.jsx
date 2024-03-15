import { Layout } from "./Layout";
import { ContextProvider } from "./provider/ContextProvider";

function App() {
  return (
    <>
      <ContextProvider>
        <Layout />
      </ContextProvider>
    </>
  );
}

export default App;
