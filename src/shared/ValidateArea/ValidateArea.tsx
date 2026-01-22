import { useParams, Navigate } from "react-router";

export function ValidateArea({ children }: { children: React.ReactNode }) {
  const { area } = useParams();
  const validAreas = ["moscow", "petersburg"];

  if (!area || !validAreas.includes(area)) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
}
