import { useState } from "react";

const SignUpForm = () => {

    const [form, setForm] = useState({ email: '', password: '', passwordCheck: ''});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        // if(!emailRegex.test(form.email)) {
        //     alert('이메일 형식을 지켜주세요');
        //     return;
        // }

        localStorage.setItem('login', JSON.stringify({email : form.email, password : form.password}));
        setForm({ email: '', password: '', passwordCheck: ''});
    }

    return(
        <div>
            {/* 회원가입 폼 */}
            <div className="relative bg-white rounded-xl shadow-lg p-6">
                {/* 타이틀 */}
                <h2 className="text-2xl font-bold text-center text-gray-800">회원가입</h2>
                <p className="text-sm text-center text-gray-500 mt-2 mb-6">
                    이메일 혹은 소셜로 회원가입 하세요
                </p>

            {/* 소셜 회원가입 버튼 */}
            <div className="flex justify-center gap-3 mb-6">
                <button className="bg-gray-100 p-3 rounded-full shadow hover:bg-gray-200 transition">
                    <i className="fab fa-google text-gray-600"></i>
                </button>
                <button className="bg-gray-100 p-3 rounded-full shadow hover:bg-gray-200 transition">
                    <i className="fab fa-facebook text-blue-600"></i>
                </button>
                <button className="bg-gray-100 p-3 rounded-full shadow hover:bg-gray-200 transition">
                    <i className="fab fa-github text-gray-600"></i>
                </button>
                <button className="bg-gray-100 p-3 rounded-full shadow hover:bg-gray-200 transition">
                    <i className="fab fa-linkedin text-blue-700"></i>
                </button>
            </div>

            {/* 이메일 및 비밀번호 입력 */}
            <form className="space-y-4" onSubmit={onSubmit}>
                <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="이메일"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="비밀번호"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                type="password"
                name="passwordCheck"
                value={form.passwordCheck}
                onChange={onChange}
                placeholder="비밀번호 확인"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {form.password !== form.passwordCheck ? <span className="text-red-500">비밀번호가 일치하지 않습니다.</span> : null}
                <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                회원가입
                </button>
            </form>
            </div>
        </div>
    )
}

export default SignUpForm;