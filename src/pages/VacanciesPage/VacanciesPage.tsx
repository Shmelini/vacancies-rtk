import { Container, Flex, Tabs } from "@mantine/core";
import { Filters } from "../../features/Filters";
import { Search } from "../../features/Search";
import { Outlet, useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../shared/hooks/redux";
import { fetchVacancies } from "../../shared/reducers/vacanciesThunk";
import "./style.scss";
import { changeAreaFilter } from "../../shared/reducers/vacanciesReducer";

export function VacanciesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const dispatch = useTypedDispatch();

  const searchQuery = searchParams.get("text") || "";
  const skillsetFilter = searchParams.get("skillset") || "";

  const currentArea = useTypedSelector(
    (state) => state.vacancies.currentAreaFilter,
  );

  function handleSearchChange(text: string) {
    if (text.length)
      setSearchParams((prev) => {
        prev.set("text", text);
        return prev;
      });
    else {
      setSearchParams((prev) => {
        prev.delete("text");
        return prev;
      });
    }
  }

  function handleFilterChange(skillset: string[]) {
    if (skillset) {
      setSearchParams((prev) => {
        if (skillset.length === 0) {
          prev.delete("skillset");
          return prev;
        } else {
          const stringifiedArr = skillset.toString();
          prev.set("skillset", stringifiedArr);
          return prev;
        }
      });
    }
  }
  function handleCityChange(city: string) {
    setSearchParams(searchParams);

    if (city === "petersburg") {
      dispatch(changeAreaFilter({ name: "petersburg", value: "2" }));
    }
    if (city === "moscow") {
      dispatch(changeAreaFilter({ name: "moscow", value: "1" }));
    }
    navigate(`${city}?${searchParams.toString()}`);
  }

  useEffect(() => {
    dispatch(
      fetchVacancies({
        areaFilter: currentArea.value,
        searchQuery: searchQuery,
      }),
    );
  }, [currentArea, dispatch]);

  return (
    <>
      <Search
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
      <Container>
        <Flex gap={24}>
          <Filters
            skillsetFilter={skillsetFilter}
            handleFilterChange={handleFilterChange}
          />
          <Flex direction="column" gap={24}>
            <Tabs
              defaultValue={currentArea.name}
              onChange={(value) => value !== null && handleCityChange(value)}
            >
              <Tabs.List>
                <Tabs.Tab value="moscow">Москва</Tabs.Tab>
                <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
              </Tabs.List>
            </Tabs>
            <Outlet />
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
