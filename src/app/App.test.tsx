import { StrictMode } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "../shared/store/store";

describe("App component", () => {
  it("компонент App должен рендериться", () => {
    render(
      <StrictMode>
        <MantineProvider>
          <Provider store={store()}>
            <App />
          </Provider>
        </MantineProvider>
      </StrictMode>
    );

    expect(screen.getByText(".FrontEnd")).toBeInTheDocument();
  });
});
