import { Outlet } from "react-router";
import { Header } from "../../widgets/Header";

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
