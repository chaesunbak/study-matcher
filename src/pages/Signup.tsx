import { useNavigate } from "react-router";
import SignUpForm from "../components/user/SignUpForm";

const Signup = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/login");
	};

	return (
		<>
			{/* 회원가입 카드 */}
			<div className="relative w-11/12 max-w-sm">
				{/* 배경 박스 */}
				<div className="absolute inset-0 rounded-xl bg-indigo-50 shadow-lg"></div>

				<SignUpForm />
			</div>

			<div className="mt-6 flex items-center justify-center text-sm text-gray-500">
				<span>계정이 있으신가요?</span>
				<div className="ml-2 cursor-pointer text-indigo-500 hover:underline" onClick={handleClick}>
					로그인
				</div>
			</div>
		</>
	);
};

export default Signup;
