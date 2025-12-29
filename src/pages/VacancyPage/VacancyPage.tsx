import { Card, Container, Flex, Text } from "@mantine/core";
import { VacancyCard } from "../../entities/VacancyCard";
import type { Vacancy } from "../../app/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import parse from "html-react-parser";

import s from "./style.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(s);

type SingleVacancy = Vacancy & {
  description: string;
};

export function VacancyPage() {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<SingleVacancy | null>(null);

  useEffect(() => {
    fetch(`https://api.hh.ru/vacancies/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setVacancy(json);
        console.log(json.description);
      });
  }, [id]);

  return (
    <Container mt={24} mb={24}>
      <Flex direction="column" align="center" gap={29}>
        {vacancy && <VacancyCard vacancy={vacancy} source="item" />}
        <Card radius={12} w={659} h="fit-content">
          <Flex direction="column" gap={16}>
            {/* <Title order={3} fw={600} fz={24} c={"#000000"}>
              Компания
            </Title>
            <Text fw={400} fz={16} c={"#000000"}></Text> */}
          </Flex>
          <Flex direction="column" gap={16}>
            {/* <Title order={4} w={600} fz={16} c={"#000000"}>
              О проекте:
            </Title> */}
            <Text fw={400} fz={16} c={"#000000"} className={cx("vac-info")}>
              {vacancy && parse(vacancy.description)}
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
}
