import { Link, useNavigate } from 'react-router';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';
import { requestHandlerUser } from '../api/usersApi/userHttp';

const WithdrawUser = () => {
  const { logOutUser } = useUserStore((state) => state.actions);
  const navigate = useNavigate();
  const [isWithDraw, setIsWithDraw] = useState(false);

  const deleteUser = async () => {
    try {
      const response = await requestHandlerUser('delete', `/users/me`);
      switch (response.status) {
        case 202:
          sessionStorage.removeItem('access_token');
          logOutUser();
          setIsWithDraw(true);
          break;
        case 401:
          alert('세션이 만료되었습니다. 다시 로그인 후 이용해주세요.');
          navigate('/login');
          break;
        case 404:
          alert('해당 계정은 이미 삭제 되었거나 존재하지 않습니다.');
          navigate('/');
          break;
      }
    } catch (e) {
      console.error('Error deleting user:', e);
      alert('회원 탈퇴 실패. 다시 시도해주세요.');
      return;
    }
  };

  const handleLogout = () => {
    deleteUser();
  };

  return (
    <>
      <div className="bg-gray-50 flex min-h-screen">
        <div className="flex w-3/4 flex-col items-center justify-center space-y-6 p-6">
          {isWithDraw ? (
            <div>
              <div className="space-y-3 text-center">
                <h2 className="text-3xl font-bold text-slate-800">회원 정보가 삭제되었습니다.</h2>
                <p className="text-gray-600">서비스 이용을 원하시면 회원 가입 해주세요.</p>
              </div>

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
              <div className="text-2xl font-semibold text-slate-800">계정을 삭제하시겠습니까?</div>

              <button
                onClick={handleLogout}
                className="w-64 rounded-md bg-red-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-red-600"
              >
                회원 탈퇴
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WithdrawUser;
