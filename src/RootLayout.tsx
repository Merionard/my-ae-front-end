import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/header";
import SideNav from "./components/layout/sidenav";

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col sm:flex-row ">
        <SideNav />
        <main className="w-full mx-auto bg-primary-foreground">
          <Outlet />
        </main>
      </div>
      <footer className="bg-gray-100">Footer</footer>
    </div>
  );
};
