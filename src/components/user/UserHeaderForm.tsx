import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useUserStore } from '../../store/userStore';

const UserHeaderForm = () => {
  const isLogin = useUserStore((state) => state);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = [
    { name: '마이 페이지', link: 'profile' },
    { name: '결제', link: 'pay' },
    { name: '문의', link: 'about' },
  ];

  return (
    <div>
      {isLogin.userId ? (
        <div className="relative">
          {/* 사용자 아이콘 */}
          <div
            className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 shadow-md"
            onClick={toggleUserMenu}
          >
            <FaRegUser />
          </div>

          {/* 드롭다운 메뉴 */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg">
              <ul className="py-2">
                {toggleMenu.map((menu, index) => (
                  <li
                    key={index}
                    onClick={() => navigate(`/${menu.link}`)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {menu.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => navigate('/login')}>로그인</button>
      )}
    </div>
  );
};

export default UserHeaderForm;
