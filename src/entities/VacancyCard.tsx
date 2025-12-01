import { Badge, Button, Card, Flex, Group } from "@mantine/core";
import type { Vacancy } from "../app/types/types";
import s from "./style.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(s);

type VacancyCardProps = {
  vacancy: Vacancy;
};

export function VacancyCard({ vacancy }: VacancyCardProps) {
  const salaryCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "USD":
        return "\u0024";
      case "RUR":
        return "\u20bd";
      case "UZS":
        return "so'm";
      case "KZT":
        return "\u20b8";
    }
  };

  function workFormatColor(id: string) {
    switch (id) {
      case "HYBRID":
        return ["#0F0F10", "#FFFFFF"];
      case "ON_SITE":
        return ["#0F0F101A", "#0F0F1080"];
      case "REMOTE":
        return ["#4263EB", "#FFFFFF"];
      default:
        return ["#4263EB", "#FFFFFF"];
    }
  }

  function declensionOfYears(years: number) {
    const cases = [2, 0, 1, 1, 2, 2];
    const forms = ["год", "года", "лет"];
    const i =
      years % 100 > 10 && years % 100 < 20 ? 2 : cases[Math.min(years % 10, 5)];
    return forms[i];
  }

  function experienceFormatter(expId: string) {
    if (expId.includes("no")) {
      return "Без опыта";
    } else if (expId.includes("between")) {
      const from = expId.slice(-5, -4);
      const to = expId.slice(-1);
      return `Опыт ${from}-${to} ${declensionOfYears(Number(to))}`;
    } else if (expId.includes("more")) {
      return `Опыт более ${expId.slice(-1)} ${declensionOfYears(
        Number(expId.slice(-1))
      )}`;
    }
  }

  return (
    <Card radius={12} w={659} h="fit-content" className={cx("vacancy-card")}>
      <p className={cx("vacancy-card__name")}>{vacancy.name}</p>
      <Group gap={16}>
        {vacancy.salary !== null && (
          <Group gap={5} className={cx("vacancy-card__salary")}>
            {vacancy.salary.from !== null && (
              <p>{new Intl.NumberFormat("ru").format(vacancy.salary.from)}</p>
            )}
            {vacancy.salary.from !== null && vacancy.salary.to !== null && (
              <p>–</p>
            )}
            {vacancy.salary.to !== null && (
              <p>{new Intl.NumberFormat("ru").format(vacancy.salary.to)}</p>
            )}
            <p>{salaryCurrencySymbol(vacancy.salary.currency)}</p>
          </Group>
        )}
        <p className={cx("vacancy-card__experience")}>
          {experienceFormatter(vacancy.experience.id)}
        </p>
      </Group>
      <Flex direction="column" align="start" gap={8}>
        <p className={cx("vacancy-card__employer")}>{vacancy.employer.name}</p>
        {vacancy.work_format.length !== 0 && (
          <Group>
            {vacancy.work_format.map((item) => (
              <Badge
                key={vacancy.employer.id + item.id}
                radius="xs"
                color={workFormatColor(item.id)[0]}
                c={workFormatColor(item.id)[1]}
              >
                {item.name}
              </Badge>
            ))}
          </Group>
        )}
        <p className={cx("vacancy-card__area")}>{vacancy.area.name}</p>
      </Flex>
      <Group mt="auto">
        <Button w={172} fw={400} color="#0F0F10">
          Смотреть вакансию
        </Button>
        <Button color="rgba(15, 15, 16, 0.1)" c="#0F0F10">
          <a
            className={cx("vacancy-card__link")}
            target="_blank"
            rel="noopener noreferrer"
            href={vacancy.alternate_url}
          >
            Откликнуться
          </a>
        </Button>
      </Group>
    </Card>
  );
}
