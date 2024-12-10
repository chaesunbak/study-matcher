import { useNavigate } from "react-router";
import LoginForm from "../components/user/LoginForm";

const Login = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/signup");
	};

	return (
		<>
			{/* 로그인 카드 */}
			<div className="relative w-11/12 max-w-sm">
				{/* 배경 박스 */}
				<div className="absolute inset-0 rounded-xl bg-indigo-50 shadow-lg"></div>

				<LoginForm />
			</div>

			<div className="mt-6 flex items-center justify-center text-sm text-gray-500">
				<span>계정이 없으신가요??</span>
				<div className="ml-2 cursor-pointer text-indigo-500 hover:underline" onClick={handleClick}>
					회원가입
				</div>
			</div>
		</>
	);
};

export default Login;
