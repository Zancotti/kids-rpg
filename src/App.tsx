import Main from "./Main";
import { MantineProvider } from "@mantine/core";

const App: React.FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Main />
    </MantineProvider>
  );
};

export default App;
