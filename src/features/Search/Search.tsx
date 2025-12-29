import { Button, Container, Flex, Input, Text, Title } from "@mantine/core";
import SearchImg from "../../shared/images/search.svg?react";
import s from "./style.module.scss";
import classNames from "classnames/bind";
import { useTypedDispatch, useTypedSelector } from "../../shared/hooks/redux";
import { fetchVacancies } from "../../shared/reducers/vacanciesThunk";
import { changeSearchQuery } from "../../shared/reducers/vacanciesReducer";

const cx = classNames.bind(s);

type SearchProps = {
  handleSearchChange: (text: string) => void;
};

export function Search({ handleSearchChange }: SearchProps) {
  const searchInput = useTypedSelector((state) => state.vacancies.searchQuery);
  const areaFilter = useTypedSelector(
    (state) => state.vacancies.currentAreaFilter
  );

  const dispatch = useTypedDispatch();

  function handleSearch() {
    handleSearchChange(searchInput);
    dispatch(fetchVacancies({ areaFilter, searchQuery: searchInput }));
  }

  return (
    <div className={cx("search-container")}>
      <Container h={114} className={cx("search-container__inner")}>
        <Flex direction="column" gap={4}>
          <Title order={2} fz={26} c="#0F0F10">
            Список вакансий
          </Title>
          <Text fz={20} c="#0F0F1080">
            по профессии Frontend-разработчик
          </Text>
        </Flex>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={cx("search__form")}
        >
          <Input
            w={403}
            radius="md"
            size="md"
            c="#0F0F104D"
            value={searchInput}
            onChange={(e) => dispatch(changeSearchQuery(e.target.value))}
            leftSection={<SearchImg className={cx("search__image")} />}
            placeholder="Должность или название компании"
          />
          <Button
            type="submit"
            onClick={handleSearch}
            w={93}
            h={42}
            fw={400}
            fz={16}
            color="#4263EB"
          >
            Найти
          </Button>
        </form>
      </Container>
    </div>
  );
}
