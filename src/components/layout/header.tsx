import { Authentication } from "../auth/authentication";

export const Header = () => {
  return (
    <header className="border-b flex justify-end gap-2 p-2">
      <Authentication />
    </header>
  );
};
