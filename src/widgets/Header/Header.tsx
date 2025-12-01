import { Anchor, Flex, Text, Image, Group } from "@mantine/core";
import logo from "../../shared/images/logo.svg";
import user from "../../shared/images/user.svg";
import s from "./style.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(s);

export function Header() {
  return (
    <Flex
      className={cx("header")}
      pos="relative"
      align="center"
      h={60}
      bg="#FFFFFF"
    >
      <Anchor pos="absolute" ml={20} h={30} underline="never">
        <Group gap={10} align="center">
          <Image w={30} h={30} src={logo} />
          <Text fz={16} fw={600} c="#000000">
            .FrontEnd
          </Text>
        </Group>
      </Anchor>
      <Group ml="auto" mr="auto">
        <Anchor c="#0F0F1080" fw={500} className={cx("header-link--active")}>
          Вакансии FE
        </Anchor>
        <Anchor c="#0F0F1080" fw={500} className={cx()}>
          <Group gap={4}>
            <Image w={24} h={24} src={user} />
            <Text>Обо мне</Text>
          </Group>
        </Anchor>
      </Group>
    </Flex>
  );
}
