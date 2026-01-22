import { ActionIcon, Card, Flex, Group, Input, Pill } from "@mantine/core";
import Cross from "../../shared/images/x.svg?react";
import Plus from "../../shared/images/plus.svg?react";
import { useTypedDispatch, useTypedSelector } from "../../shared/hooks/redux";
import s from "./style.module.scss";
import classNames from "classnames/bind";
import {
  addToSearchTags,
  removeSearchTag,
  syncSearchTags,
} from "../../shared/reducers/vacanciesReducer";
import { useEffect, useState } from "react";

const cx = classNames.bind(s);

type FiltersProps = {
  skillsetFilter: string;
  handleFilterChange: (skillset: string[]) => void;
};

export function Filters({ skillsetFilter, handleFilterChange }: FiltersProps) {
  const [input, setInput] = useState("");
  const tags = useTypedSelector((state) => state.vacancies.filterTags);

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

  useEffect(() => {
    handleFilterChange(tags);
  }, [tags, skillsetFilter]);

  useEffect(() => {
    handleFiltersSync(skillsetFilter);
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
    </Flex>
  );
}
