import { VacanciesList } from "./VacanciesList";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "../../../shared/store/store";

const initialState = {
  vacancies: {
    vacancies: [
      {
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
            name: "На месте работодателя",
          },
        ],
        experience: {
          id: "between1And3",
          name: "От 1 года до 3 лет",
        },
      },
      {
        id: "2",
        name: "JS",
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
            name: "На месте работодателя",
          },
        ],
        experience: {
          id: "between1And3",
          name: "От 1 года до 3 лет",
        },
      },
      {
        id: "3",
        name: "Frontend",
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
            name: "На месте работодателя",
          },
        ],
        experience: {
          id: "between1And3",
          name: "От 1 года до 3 лет",
        },
      },
    ],
    filterTags: ["TypeScript", "React", "Redux"],
    currentAreaFilter: "0",
    isLoading: false,
    error: null,
  },
};
describe("VacanciesList component", () => {
  it("должен рендерить продукты из стора", () => {
    const testStore = store(initialState);
    render(
      <MantineProvider>
        <Provider store={testStore}>
          <VacanciesList />
        </Provider>
      </MantineProvider>
    );

    expect(screen.getByText(/react/i)).toBeInTheDocument();
    expect(screen.getByText(/js/i)).toBeInTheDocument();
    expect(screen.getByText(/frontend/i)).toBeInTheDocument();
  });

  it("не должен ничего рендерить с пустым стором", () => {
    render(
      <MantineProvider>
        <Provider store={store()}>
          <VacanciesList />
        </Provider>
      </MantineProvider>
    );

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });
});
