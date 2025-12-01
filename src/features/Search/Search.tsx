import { Button, Container, Flex, Input, Text, Title } from "@mantine/core";
import SearchImg from "../../shared/images/search.svg?react";
import s from "./style.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { useTypedDispatch } from "../../hooks/redux";
import { fetchVacancies } from "../../reducers/vacanciesThunk";

const cx = classNames.bind(s);

export function Search() {
  const [input, setInput] = useState("");

  const dispatch = useTypedDispatch();

  function handleSearch() {
    dispatch(fetchVacancies({ searchQuery: input }));
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
