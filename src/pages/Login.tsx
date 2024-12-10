import LoginForm from "../components/user/LoginForm";

const Login = () => {
	return (
		<>
		  {/* 로그인 카드 */}
		  <div className="relative w-11/12 max-w-sm">
			{/* 배경 박스 */}
			<div className="absolute inset-0 bg-indigo-50 rounded-xl shadow-lg"></div>
	
			<LoginForm />
		  </div>
	
		  <p className="text-sm text-gray-500 mt-6">
			계정이 없으신가요?{" "}
			<a href="#" className="text-indigo-500 hover:underline">
			  회원가입
			</a>
		  </p>
		</>
	  );
};

export default Login;
