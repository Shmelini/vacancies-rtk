import { Container, Flex } from "@mantine/core";
import "./App.scss";
import { Search } from "../features/Search";
import { VacanciesList } from "../pages/VacanciesList";
import { Header } from "../widgets/Header";
import { Filters } from "../features/Filters";

function App() {
  return (
    <>
      <Header />
      <Search />
      <Container>
        <Flex gap={24}>
          <Filters />
          <VacanciesList />
        </Flex>
      </Container>
    </>
  );
}

export default App;
