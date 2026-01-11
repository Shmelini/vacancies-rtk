import { Flex, Text, Image, Group } from "@mantine/core";
import logo from "../../shared/images/logo.svg";
import user from "../../shared/images/user.svg";
import s from "./style.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router";
import { CustomLink } from "../../shared/CustomLink";

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
      <Link to="/" className={cx("header__logo")}>
        <Group gap={10} align="center">
          <Image w={30} h={30} src={logo} />
          <Text fz={16} fw={600} c="#000000">
            .FrontEnd
          </Text>
        </Group>
      </Link>
      <Group ml="auto" mr="auto">
        <CustomLink to="vacancies" className={cx("header-link")}>
          Вакансии FE
        </CustomLink>
        <CustomLink to="profile" className={cx("header-link")}>
          <Group gap={4}>
            <Image w={24} h={24} src={user} />
            <Text>Обо мне</Text>
          </Group>
        </CustomLink>
      </Group>
    </Flex>
  );
}
