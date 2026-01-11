import { Container, Flex } from "@mantine/core";
import { Filters } from "../../features/Filters";
import { VacanciesList } from "./VacanciesList";
import { Search } from "../../features/Search";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useTypedDispatch } from "../../shared/hooks/redux";
import { fetchVacancies } from "../../shared/reducers/vacanciesThunk";

export function VacanciesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("text") || "";
  const currentArea = searchParams.get("area") || "0";
  const skillsetFilter = searchParams.get("skillset") || "";

  const dispatch = useTypedDispatch();

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

  function handleAreaChange(areaFilter: string) {
    if (areaFilter !== "0") {
      setSearchParams((prev) => {
        prev.set("area", areaFilter);

        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete("area");
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

  useEffect(() => {
    dispatch(
      fetchVacancies({
        areaFilter: currentArea,
        searchQuery: searchQuery,
      })
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
            currentArea={currentArea}
            skillsetFilter={skillsetFilter}
            handleAreaChange={handleAreaChange}
            handleFilterChange={handleFilterChange}
          />
          <VacanciesList />
        </Flex>
      </Container>
    </>
  );
}
