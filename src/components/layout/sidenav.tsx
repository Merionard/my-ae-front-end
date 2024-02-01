import NavLinks from "./nav-links";
import Logo from "./logo";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <a
        className="mb-2 flex h-20 items-center justify-start rounded-md bg-blue-600 p-4 md:h-36"
        href="/"
      >
        <div className="w-40 text-white md:w-52">
          <Logo />
        </div>
      </a>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}