import { VacancyCard } from "./VacancyCard";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "../store/store";

describe("VacancyCard component", () => {
  const vacancy = {
    id: "1",
    name: "react",
    area: {
      id: "2779",
      name: "тихохолмск",
      url: "https://www.test.com/",
    },
    salary: {
      from: 2400000,
      to: 12500000,
      currency: "UZS",
    },
    alternate_url: "https://www.test.com/",
    employer: {
      id: "1",
      name: "ogo it",
    },
    work_format: [
      {
        id: "ON_SITE",
        name: "На месте работодателя",
      },
    ],
    experience: {
      id: "between1And3",
      name: "От 1 года до 3 лет",
    },
  };

  beforeEach(() => {
    render(
      <MantineProvider>
        <Provider store={store()}>
          <VacancyCard vacancy={vacancy} />
        </Provider>
      </MantineProvider>
    );
  });

  it("компонент должен рендериться при корректно переданных пропсах", () => {
    expect(screen.getByText(/react/i)).toBeInTheDocument();
    expect(screen.getByText(/тихохолмск/i)).toBeInTheDocument();
    expect(screen.getByText(/На месте работодателя/i)).toBeInTheDocument();
    expect(screen.getByText(/откликнуться/i)).toHaveAttribute(
      "href",
      "https://www.test.com/"
    );
  });
});
