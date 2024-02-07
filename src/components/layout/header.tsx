import { Authentication } from "../auth/authentication";

export const Header = () => {
  return (
    <header className=" flex justify-end gap-2 p-2">
      <Authentication />
    </header>
  );
};
