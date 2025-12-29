import { Container, Flex } from "@mantine/core";
import { Filters } from "../../features/Filters";
import { VacanciesList } from "./VacanciesList";
import { Search } from "../../features/Search";
import { useSearchParams } from "react-router";
import { useEffect } from "react";

export function VacanciesPage() {
  const [, setSearchParams] = useSearchParams();

  function handleSearchChange(text: string) {
    if (text.length)
      setSearchParams((prev) => {
        prev.set("text", text);
        return prev;
      });
  }

  function handleAreaChange(areaFilter: string) {
    if (areaFilter !== "0") {
      setSearchParams((prev) => {
        prev.set("areaFilter", areaFilter);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete("areaFilter");
        return prev;
      });
    }
  }
  useEffect(() => {
    return setSearchParams({});
  }, []);

  return (
    <>
      <Search handleSearchChange={handleSearchChange} />
      <Container>
        <Flex gap={24}>
          <Filters handleAreaChange={handleAreaChange} />
          <VacanciesList />
        </Flex>
      </Container>
    </>
  );
}
