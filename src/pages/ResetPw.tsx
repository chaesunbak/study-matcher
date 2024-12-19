import { Link } from 'react-router';
import ResetPwForm from '../components/user/ResetPwForm';

const ResetPw = () => {
  return (
    <>
      {/* 로그인 카드 */}
      <div className="relative mx-auto mt-20 w-11/12 max-w-sm rounded-xl bg-white p-6 shadow-lg">
        {/* LoginForm 컴포넌트 */}
        <ResetPwForm />
        <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
          <Link to="/login" className="text-indigo-500 ml-2 cursor-pointer hover:underline">
            로그인
          </Link>
          <Link to="/signup" className="text-indigo-500 ml-2 cursor-pointer hover:underline">
            계정 만들기
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResetPw;