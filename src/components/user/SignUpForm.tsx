import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const onSubmit = (data) => {
		localStorage.setItem(
			"register",
			JSON.stringify({ email: data.email, password: data.password }),
		);
	};

	const buttonList = [
		{ label: "google", color: "gray" },
		{ label: "facebook", color: "blue" },
		{ label: "github", color: "black" },
		{ label: "kakao", color: "yellow" },
	];

	const password = useRef();
	password.current = watch("password");

	return (
		<div>
			{/* 회원가입 폼 */}
			<div className="relative rounded-xl bg-white p-6 shadow-lg">
				{/* 타이틀 */}
				<h2 className="text-center text-2xl font-bold text-gray-800">회원가입</h2>
				<p className="mb-6 mt-2 text-center text-sm text-gray-500">
					이메일 혹은 소셜로 회원가입 하세요
				</p>

				{/* 소셜 회원가입 버튼 */}
				<div className="mb-6 flex justify-center gap-3">
					{buttonList.map((button, index) => (
						<button
							key={index}
							className="rounded-full bg-gray-100 p-3 shadow transition hover:bg-gray-200"
						>
							<i className={`fab fa-${button.label} text-${button.color}-600`}></i>
						</button>
					))}
				</div>

				{/* 이메일 및 비밀번호 입력 */}
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<input
						className="w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="이메일을 입력하세요"
						{...register("email", {
							required: { value: true, message: "이메일을 입력해주세요" },
							pattern: { value: /^\S+@\S+$/i, message: "이메일 형식이 올바르지 않습니다" },
						})}
					/>
					{errors?.email && <p className="text-red-500">{String(errors?.email?.message)}</p>}
					<input
						className="w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						type="password"
						placeholder="비밀번호를 입력하세요"
						{...register("password", {
							required: { value: true, message: "비밀번호를 입력해주세요" },
							minLength: { value: 8, message: "비밀번호는 8자 이상 입력하세요" },
							maxLength: { value: 16, message: "비밀번호는 16자 이하로 입력하세요" },
						})}
					/>
					{errors?.password && <p className="text-red-500">{String(errors?.password?.message)}</p>}
					<input
						className="w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						type="password"
						placeholder="비밀번호를 확인해주세요"
						{...register("passwordConfirm", {
							required: { value: true, message: "비밀번호를 확인해주세요" },
							validate: (value) => value === password.current,
						})}
					/>
					{errors?.passwordConfirm?.type === "required" && (
						<p className="text-red-500">{String(errors?.passwordConfirm?.message)}</p>
					)}
					{errors?.passwordConfirm?.type === "validate" && (
						<p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
					)}
					<button
						type="submit"
						className="w-full rounded-lg bg-indigo-500 py-2 text-white transition hover:bg-indigo-600"
					>
						회원가입
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
