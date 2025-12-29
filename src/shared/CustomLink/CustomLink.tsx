import { Link, useMatch } from "react-router";

type CustomLinkProps = {
  children: React.ReactNode;
  to: string;
  className: string;
};

export function CustomLink({ children, to, className }: CustomLinkProps) {
  const match = useMatch(to);

  return (
    <Link to={to} className={match ? `${className} active` : className}>
      {children}
    </Link>
  );
}
