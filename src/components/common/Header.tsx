import { Link } from 'react-router';
import { LuSearch, LuCircleUserRound, LuAlignJustify } from 'react-icons/lu';
import SearchInput from '../SearchInput';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 flex items-center justify-between bg-white p-4">
      <Link to="/">
        <h1 className="text-4xl font-bold">LOGO</h1>
      </Link>
      <SearchInput className="hidden md:flex" />
      <div className="flex gap-4">
        <LuSearch className="size-6 cursor-pointer md:hidden" onClick={() => navigate('/search')} />
        <LuCircleUserRound className="size-6 cursor-pointer" />
        <LuAlignJustify className="size-6 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
