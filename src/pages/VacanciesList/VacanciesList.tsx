import { useEffect, useState } from "react";
import { useTypedSelector, useTypedDispatch } from "../../hooks/redux";
import { fetchVacancies } from "../../reducers/vacanciesThunk";
import { VacancyCard } from "../../entities/VacancyCard";
import type { Vacancy } from "../../app/types/types";
import { Flex, Loader, Pagination } from "@mantine/core";

export function VacanciesList() {
  const [activePage, setActivePage] = useState(1);

  const dispatch = useTypedDispatch();
  const { vacancies } = useTypedSelector((state) => state.vacancies);

  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }
  function chunkVacancies(vacancies: Vacancy[]) {
    const data = chunk(vacancies, 10);
    const items = data[activePage - 1].map((vacancy) => (
      <VacancyCard key={vacancy.id} vacancy={vacancy} />
    ));
    return items;
  }

  function handlePagination(page: number) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActivePage(page);
  }

  useEffect(() => {
    vacancies.length === 0 && dispatch(fetchVacancies({}));
  }, []);

  return (
    <Flex mb={30} w="100%" gap={24} direction="column" align="center">
      {vacancies.length !== 0 ? (
        <>
          <Flex gap={16} direction="column">
            {vacancies.length !== 0 && chunkVacancies(vacancies)}
          </Flex>
          <Pagination
            total={vacancies.length / 10}
            value={activePage}
            onChange={handlePagination}
            size="md"
            withEdges
          />
        </>
      ) : (
        <Loader color="#364FC7" type="dots" size="xl" data-testid="loader" />
      )}
    </Flex>
  );
}
