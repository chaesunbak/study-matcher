import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Button from '../common/Button';
import { cn } from '../../utils/utils';

interface toggleMenu {
  name: string;
  link: string;
}

// 메뉴 항목
export const toggleMenu = [
  { name: '마이 페이지', link: '' },
  { name: '로그아웃', link: 'logout' },
  { name: '회원탈퇴', link: 'withdraw' },
];

interface UserHeaderFormProps {
  mode?: 'dropdown' | 'leftMenu';
  className?: string;
}

const UserHeaderForm = ({ mode = 'dropdown', className }: UserHeaderFormProps) => {
  const user = sessionStorage.getItem('access_token');
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('마이 페이지');

  const toggleUserMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (menu: toggleMenu) => {
    navigate(`/profile/${menu.link}`);

    setIsOpen(false);
    setSelectedMenu(menu.name);
  };

  return mode === 'dropdown' ? (
    // 드롭다운 메뉴 모드
    <div className={className}>
      {user ? (
        <div className="relative">
          <div
            className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 shadow-md"
            onClick={toggleUserMenu}
          >
            <FaRegUser />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg">
              <ul className="py-2">
                {toggleMenu.map((menu, index) => (
                  <li
                    key={index}
                    onClick={() => handleMenuClick(menu)}
                    className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {menu.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Button variant="header" onClick={() => navigate('/login')}>
          로그인
        </Button>
      )}
    </div>
  ) : (
    // 왼쪽 메뉴 모드
    <div className={cn('w-1/4 rounded-lg border border-slate-500', className)}>
      <div className="p-6">
        <h2 className="mb-4 text-xl font-bold">{selectedMenu}</h2>
        <ul className="space-y-3">
          {toggleMenu.map((menu, index) => (
            <li
              key={index}
              onClick={() => handleMenuClick(menu)}
              className={`cursor-pointer ${
                selectedMenu === menu.name
                  ? 'font-semibold text-green-500'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {menu.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserHeaderForm;
