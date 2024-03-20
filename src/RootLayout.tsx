import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/header";
import SideNav from "./components/layout/sidenav";
import { useCheckConnection } from "./features/hooks";
import { Toaster } from "sonner";
import { Github, Linkedin } from "lucide-react";
import reactLogo from "./assets/react-2.svg";
import tailwindLogo from "./assets/tailwindcss.svg";
import springLogo from "./assets/spring-14.svg";

export const RootLayout = () => {
  useCheckConnection();
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Header />
      <div className="flex-1 flex flex-col sm:flex-row ">
        <SideNav />
        <main className="w-full mx-auto bg-primary-foreground">
          <Outlet />
        </main>
      </div>
      <footer className="py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 sm ">
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-center ">
            <div>
              <a
                href="http://www.linkedin.com/in/michaël-ben-arab-3458a087"
                className="text-gray-400 hover:text-blue-600 flex items-center space-x-2"
                target="_blank"
              >
                <Linkedin className="h-6 w-6" />
                <span>LinkedIn</span>
              </a>
            </div>
            <div>
              <a
                href="https://github.com/Merionard/my-ae-front-end"
                className="text-gray-400 hover:text-blue-600 flex items-center space-x-2"
                target="_blank"
              >
                <Github className="h-6 w-6" />
                <span>GitHub</span>
              </a>
            </div>
            <div className="flex justify-start md:justify-end lg:justify-center space-x-4">
              <img
                src={reactLogo}
                alt="React"
                className="h-10"
                title="React js"
              />
              <img
                src={tailwindLogo}
                alt="Tailwind CSS"
                className="h-10"
                title="Tailwind css"
              />
              <img
                src={springLogo}
                alt="Spring"
                className="h-10"
                title="Spring"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
