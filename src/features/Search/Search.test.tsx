import { Search } from "./Search";
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
          <Search />
        </Provider>
      </MantineProvider>
    );
  });

  it("компонент должен рендериться", () => {
    expect(screen.getByText("Список вакансий")).toBeInTheDocument();
    expect(screen.getByText("по профессии Frontend-разработчик"));
  });
  it("инпут должен менять значение", () => {
    const input = screen.getAllByPlaceholderText(
      /должность или название компании/i
    );
    expect(input[0]).toHaveValue("");
    fireEvent.change(input[0], { target: { value: "react" } });
    expect(input[0]).toHaveValue("react");
  });
});
