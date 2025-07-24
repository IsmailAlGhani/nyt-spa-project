import { Link } from 'react-router';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Header = () => {
  return (
    <header className="navbar bg-base-100 border-base-300 border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-x-2">
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            <span className="text-primary">NYT</span> Article Search
          </Link>
          <div className="ml-2 flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
