import { Link } from 'react-router';
import UserHeaderForm from '../components/user/UserHeaderForm';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';

const Logout = () => {
  const { logOutUser } = useUserStore((state) => state.actions);
  const [isLogOut, setIsLogOut] = useState(false);

  const handleLogout = () => {
    logOutUser();
    sessionStorage.removeItem('access_token');
    setIsLogOut(true);
  };

  return (
    <>
      <div className="bg-gray-50 flex min-h-screen">
        <div className="flex w-3/4 flex-col items-center justify-center space-y-6 p-6">
          {isLogOut ? (
            <div>
              {/* 로그아웃 상태 안내 메시지 */}
              <div className="space-y-3 text-center">
                <h2 className="text-3xl font-bold text-slate-800">로그아웃 되었습니다</h2>
                <p className="text-gray-600">서비스 이용을 원하시면 다시 로그인해 주세요.</p>
              </div>

              {/* 메인 페이지로 이동 */}
              <div>
                <Link
                  to="/"
                  className="text-lg font-semibold text-primary transition duration-300 hover:text-gray-700 hover:underline"
                >
                  메인 페이지로 돌아가기
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* 로그아웃 안내 텍스트 */}
              <div className="text-2xl font-semibold text-slate-800">로그아웃 하시겠습니까?</div>

              {/* 로그아웃 버튼 */}
              <button
                onClick={handleLogout}
                className="w-64 rounded-md bg-red-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-red-600"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Logout;
