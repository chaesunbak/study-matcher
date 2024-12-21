import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { LuAlignJustify } from 'react-icons/lu';
import { useState, useEffect, useRef } from 'react';
import UserHeaderForm from '../user/UserHeaderForm';

const CATEGORY_LIST = [
  { link: '/', name: '홈' },
  { link: '/search', name: '모임 찾기' },
  { link: '/groups/create', name: '모임 만들기' },
];

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <header className="container sticky top-0 z-40 mx-auto flex items-center justify-between bg-white p-4 dark:bg-black">
      <Link to="/">
        <h1 className="text-primary">★LOGO</h1>
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
        <UserHeaderForm />
        <LuAlignJustify className="size-6 cursor-pointer md:hidden" onClick={toggleMenu} />
      </div>
      {isMenuOpen && (
        <nav
          ref={menuRef}
          className="absolute left-0 top-16 w-full bg-white shadow-md transition md:hidden dark:bg-black"
        >
          <ul className="flex flex-col space-y-2 p-4">
            {CATEGORY_LIST.map((category) => (
              <li key={category.link}>
                <Link
                  to={category.link}
                  className={clsx(
                    'font-medium underline-offset-1 hover:font-semibold hover:underline',
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
