import { Link } from "react-router";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Header = () => {
  return (
    <header className="navbar bg-base-100 shadow-sm border-b border-base-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-x-2">
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            <span className="text-primary">NYT</span> Article Search
          </Link>
          <div className="flex items-center ml-2">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
