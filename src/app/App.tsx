import "./App.scss";
import { Routes, Route, Navigate } from "react-router";
import { Layout } from "./Layout";
import { VacanciesPage } from "../pages/VacanciesPage";
import { ProfilePage } from "../pages/ProfilePage";
import { VacancyPage } from "../pages/VacancyPage/VacancyPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="vacancies" replace />} />
          <Route path="vacancies" element={<VacanciesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="vacancies/:id" element={<VacancyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
