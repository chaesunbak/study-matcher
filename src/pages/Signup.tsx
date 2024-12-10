import SignUpForm  from "../components/user/SignUpForm";

const Signup = () => {
	return (
		<>
		  {/* 회원가입 카드 */}
		  <div className="relative w-11/12 max-w-sm">
			{/* 배경 박스 */}
			<div className="absolute inset-0 bg-indigo-50 rounded-xl shadow-lg"></div>
	
			<SignUpForm />
			
			</div>
		</>
	  );
};

export default Signup;
