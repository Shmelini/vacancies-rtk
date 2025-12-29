import { Filters } from "./Filters";
import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "../../shared/store/store";

describe("Filters component", () => {
  beforeEach(() => {
    render(
      <MantineProvider>
        <Provider store={store()}>
          <Filters />
        </Provider>
      </MantineProvider>
    );
  });

  it("компонент должен рендериться", () => {
    expect(screen.getByText(/typescript/i)).toBeInTheDocument();
    expect(screen.getByText(/москва/i)).toBeInTheDocument();
  });

  it("по нажатию на компонент pill он удаляется", () => {
    const test = screen.getAllByTestId("remove-btn");
    screen.debug();
    expect(screen.getByText(/typescript/i)).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();
    expect(screen.getByText(/redux/i)).toBeInTheDocument();

    fireEvent.click(test[0]);
    fireEvent.click(test[1]);
    fireEvent.click(test[2]);

    expect(screen.queryByText(/typescript/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/react/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/redux/i)).not.toBeInTheDocument();
  });
  it("инпут должен добавлять новый компонент pill", () => {
    const input = screen.getByPlaceholderText(/навык/i);
    const btn = screen.getByTestId("add-btn");

    fireEvent.change(input, { target: { value: "test skill" } });
    fireEvent.click(btn);

    expect(screen.getByText(/test skill/i)).toBeInTheDocument();
  });
});
