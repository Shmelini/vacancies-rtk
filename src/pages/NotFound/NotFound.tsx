import {
  Button,
  Card,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router";

import s from "./style.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(s);

export function NotFound() {
  return (
    <Container w={707}>
      <Card>
        <Stack gap={32}>
          <Group justify="space-between" preventGrowOverflow>
            <Stack gap={12} w={450}>
              <Title fz={34} fw={700} order={1}>
                Упс! Такой страницы не существует
              </Title>
              <Text fz={18}>Давайте перейдём к началу.</Text>
            </Stack>
            <Button fw={400} size="md" color="#4263EB">
              <Link
                className={cx("redirect-button__text")}
                to="/vacancies/moscow"
              >
                На главную
              </Link>
            </Button>
          </Group>
          <Image
            h={336}
            radius="lg"
            src="https://media1.tenor.com/m/baBulgRz6XkAAAAd/sad-cat.gif"
          />
        </Stack>
      </Card>
    </Container>
  );
}
