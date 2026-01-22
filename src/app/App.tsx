import "./App.scss";
import { Routes, Route, Navigate } from "react-router";
import { Layout } from "./Layout";
import { VacanciesPage } from "../pages/VacanciesPage";
import { ProfilePage } from "../pages/ProfilePage";
import { VacancyPage } from "../pages/VacancyPage/VacancyPage";
import { VacanciesList } from "../pages/VacanciesPage/VacanciesList";
import { useTypedSelector } from "../shared/hooks/redux";
import { ValidateArea } from "../shared/ValidateArea";
import { NotFound } from "../pages/NotFound";

function App() {
  const area = useTypedSelector(
    (state) => state.vacancies.currentAreaFilter.name,
  );
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Navigate to={`vacancies/${area}`} replace />}
          />
          <Route
            path="vacancies"
            element={
              <ValidateArea>
                <VacanciesPage />
              </ValidateArea>
            }
          >
            <Route path=":area" element={<VacanciesList />} />
          </Route>
          <Route
            path="vacancies/:area/:id"
            element={
              <ValidateArea>
                <VacancyPage />
              </ValidateArea>
            }
          />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
