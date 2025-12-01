import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App.tsx";
import { store } from "./store/store.ts";
import { createTheme, MantineProvider } from "@mantine/core";
import "./reset.css";
import "./shared/fonts/fonts.css";
import "@mantine/core/styles.css";
import "./main.scss";

const theme = createTheme({
  fontFamily: "Open-Sans",
  headings: { fontFamily: "Open-Sans" },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store()}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
