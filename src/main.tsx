import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App.tsx";
import { store } from "./shared/store/store.ts";
import { createTheme, MantineProvider } from "@mantine/core";
import "./reset.css";
import "./shared/fonts/fonts.css";
import "@mantine/core/styles.css";
import "./main.scss";
import { BrowserRouter } from "react-router";

const theme = createTheme({
  fontFamily: "Open-Sans",
  headings: { fontFamily: "Open-Sans" },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store()}>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
