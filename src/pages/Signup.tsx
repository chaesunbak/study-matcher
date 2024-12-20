import SignUpForm from '../components/user/SignUpForm';
import { Link } from 'react-router';

const Signup = () => {
  return (
    <>
      {/* 회원가입 카드 */}
      <div className="relative mx-auto mt-20 w-11/12 max-w-sm rounded-xl bg-white p-6">
        {/* 배경 박스 */}
        <SignUpForm />
        <div className="mt-6 flex items-center justify-center text-sm text-gray-700">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login" className="text-blue-400 ml-2 cursor-pointer hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
