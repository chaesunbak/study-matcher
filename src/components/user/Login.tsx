import { useState } from "react";

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(form);
        setForm({ ...form, [name]: value });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 다음 페이지로 로그인 정보 전송
        const registerData = localStorage.getItem('register');
        if(registerData === JSON.stringify(form)) {
            alert('로그인 성공')
        }
        setForm({ email: '', password: '' });
    };

    return (
        <>
            {/* 로그인 폼 */}
            <div className="relative bg-white rounded-xl shadow-lg p-6">
                {/* 타이틀 */}
                <h2 className="text-2xl font-bold text-center text-gray-800">로그인</h2>
                <p className="text-sm text-center text-gray-500 mt-2 mb-6">
                    이메일 혹은 소셜로 로그인 하세요
                </p>

                {/* 소셜 로그인 버튼 */}
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
                    <div className="text-right">
                        <a
                            href="#"
                            className="text-sm text-indigo-500 hover:underline"
                        >
                            비밀번호를 잃어버렸나요?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;