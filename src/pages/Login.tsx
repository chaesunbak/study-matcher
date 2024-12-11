import { useNavigate } from 'react-router';
import LoginForm from '../components/user/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };

  return (
    <>
      {/* 로그인 카드 */}
      <div className="relative mx-auto mt-20 w-11/12 max-w-sm rounded-xl bg-white p-6 shadow-lg">
        {/* LoginForm 컴포넌트 */}
        <LoginForm />
        <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
          <span>계정이 없으신가요??</span>
          <div
            className="ml-2 cursor-pointer text-indigo-500 hover:underline"
            onClick={handleClick}
          >
            회원가입
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
