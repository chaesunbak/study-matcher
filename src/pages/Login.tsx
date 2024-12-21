import { Link } from 'react-router';
import LoginForm from '../components/user/LoginForm';

const Login = () => {
  return (
    <>
      {/* 로그인 카드 */}
      <div className="relative mx-auto mt-20 w-11/12 max-w-sm rounded-xl bg-white p-6">
        {/* LoginForm 컴포넌트 */}
        <LoginForm />
        <div className="mt-6 flex items-center justify-center text-sm text-gray-700">
          <span>계정이 없으신가요?</span>
          <Link to="/signup" className="ml-2 cursor-pointer text-blue-400 hover:underline">
            계정 만들기
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
