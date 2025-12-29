import { Header } from "../../widgets/Header";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "../../shared/store/store";

describe("Header component", () => {
  render(
    <MantineProvider>
      <Provider store={store()}>
        <Header />
      </Provider>
    </MantineProvider>
  );

  it("компонет Header должен рендериться", () => {
    expect(screen.getByText(/.frontend/i)).toBeInTheDocument();
    expect(screen.getByText(/вакансии fe/i)).toBeInTheDocument();
    expect(screen.getByText(/обо мне/i)).toBeInTheDocument();
  });
});
