import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { LuAlignJustify } from 'react-icons/lu';
import { useState, useEffect, useRef } from 'react';
import { useUserStore } from '../../zustand/store';
import Profile from '../../pages/Profile';

const CATEGORY_LIST = [
  { link: '/', name: '홈' },
  { link: '/search', name: '모임 찾기' },
  { link: '/groups/create', name: '모임 만들기' },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isLogin = useUserStore((state) => state);

  const toggleMenu = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 flex items-center justify-between bg-white p-4">
      <Link to="/">
        <h1 className="text-4xl font-bold">LOGO</h1>
      </Link>
      <nav className="hidden md:flex">
        <ul className="flex space-x-5">
          {CATEGORY_LIST.map((category) => (
            <li key={category.link}>
              <Link
                to={category.link}
                className={clsx(
                  'font-medium hover:font-semibold',
                  location.pathname === category.link &&
                    'font-semibold underline underline-offset-2'
                )}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-center gap-2">
        {isLogin.userId ? <Profile /> : <button onClick={() => navigate('/login')}>로그인</button>}
        <LuAlignJustify className="size-6 cursor-pointer md:hidden" onClick={toggleMenu} />
      </div>
      {isMenuOpen && (
        <nav
          ref={menuRef}
          className="absolute left-0 top-16 w-full bg-white shadow-md transition md:hidden"
        >
          <ul className="flex flex-col space-y-2 p-4">
            {CATEGORY_LIST.map((category) => (
              <li key={category.link}>
                <Link
                  to={category.link}
                  className={clsx(
                    'font-medium hover:font-semibold',
                    location.pathname === category.link &&
                      'font-semibold underline underline-offset-2'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
