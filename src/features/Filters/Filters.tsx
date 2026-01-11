import {
  ActionIcon,
  Card,
  Flex,
  Group,
  Input,
  Pill,
  Select,
} from "@mantine/core";
import MapPin from "../../shared/images/pin.svg?react";
import Cross from "../../shared/images/x.svg?react";
import Plus from "../../shared/images/plus.svg?react";
import { useTypedDispatch, useTypedSelector } from "../../shared/hooks/redux";
import s from "./style.module.scss";
import classNames from "classnames/bind";
import {
  addToSearchTags,
  changeAreaFilter,
  removeSearchTag,
  syncSearchTags,
} from "../../shared/reducers/vacanciesReducer";
import { useEffect, useState } from "react";

const cx = classNames.bind(s);

type FiltersProps = {
  currentArea: string;
  skillsetFilter: string;
  handleAreaChange: (areafilter: string) => void;
  handleFilterChange: (skillset: string[]) => void;
};

export function Filters({
  currentArea,
  skillsetFilter,
  handleAreaChange,
  handleFilterChange,
}: FiltersProps) {
  const [input, setInput] = useState("");
  const tags = useTypedSelector((state) => state.vacancies.filterTags);
  const areaFilter = useTypedSelector(
    (state) => state.vacancies.currentAreaFilter
  );

  const dispatch = useTypedDispatch();

  function handleAddTag(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(addToSearchTags(input));
    setInput("");
  }

  function handleFiltersSync(filtersString: string) {
    if (filtersString) {
      const parsedString = filtersString.split(",");
      filtersString.length && dispatch(syncSearchTags(parsedString));
    }
  }

  function handleAreaSync(area: string) {
    if (area) {
      dispatch(changeAreaFilter(area));
    }
  }

  useEffect(() => {
    handleAreaChange(areaFilter);
  }, [areaFilter]);

  useEffect(() => {
    handleFilterChange(tags);
  }, [tags]);

  useEffect(() => {
    handleFiltersSync(skillsetFilter);
    handleAreaSync(currentArea);
  }, [dispatch]);
  return (
    <Flex direction="column" gap={10}>
      <Card w={317}>
        <form onSubmit={handleAddTag}>
          <Group mb={12}>
            <Input
              radius="md"
              size="xs"
              w={227}
              placeholder="Навык"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <ActionIcon
              radius="md"
              w={34}
              h={30}
              disabled={input.length === 0 ? true : false}
              className={cx("input-button")}
              type="submit"
              data-testid="add-btn"
            >
              <Plus />
            </ActionIcon>
          </Group>
        </form>
        <Pill.Group>
          {tags.map((tag) => (
            <Pill
              key={tag}
              className={cx("pill")}
              removeButtonProps={{
                "aria-label": "Удалить",
                icon: <Cross data-testid="remove-btn" />,
              }}
              withRemoveButton
              onRemove={() => {
                dispatch(removeSearchTag(tag));
              }}
              fz={12}
              w="fit-content"
            >
              {tag}
            </Pill>
          ))}
        </Pill.Group>
      </Card>
      <Card w={317} p={24}>
        <Select
          c="#0F0F104D"
          leftSection={<MapPin />}
          data={[
            { value: "0", label: "Все города" },
            { value: "1", label: "Москва" },
            { value: "2", label: "Санкт-Петербург" },
          ]}
          value={currentArea !== "0" ? currentArea : "0"}
          onChange={(_, option) => {
            dispatch(changeAreaFilter(option));
          }}
          comboboxProps={{
            position: "bottom",
            middlewares: { flip: false, shift: false },
          }}
          placeholder="Все города"
        />
      </Card>
    </Flex>
  );
}
