import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import Input from './\bInputForm';
import { useUserStore } from '../../zustand/store';

export const loginSchema = z.object({
  email: z.string().email({ message: '이메일 형식이 아닙니다.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상으로 입력하세요' })
    .max(16, { message: '비밀번호는 16자 이하로 입력하세요' }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { userId } = useUserStore((state) => state);
  const { loginUser, logOutUser } = useUserStore((state) => state.actions);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: { email: string; password: string }) => {
    const registerData = localStorage.getItem('register');
    if (registerData) {
      const loginData = JSON.parse(registerData);

      if (userId === data.email) {
        alert('이미 로그인 되었습니다');
        return;
      }

      if (loginData.email === data.email && loginData.password === data.password) {
        alert('로그인 성공');
        loginUser(data.email);
      } else {
        alert('로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다');
      }
    } else {
      alert('회원가입 정보가 없습니다. 먼저 회원가입을 진행해주세요.');
    }
  };

  const buttonList = [
    { label: 'google', color: 'gray' },
    { label: 'facebook', color: 'blue' },
    { label: 'github', color: 'black' },
    { label: 'kakao', color: 'yellow' },
  ];

  const handleSubmitButton = (button: { label: string; color: string }) => {
    alert(`소셜 로그인 ${button.label}`);
  };

  const handleClick = () => {
    navigate('/forgot-password');
  };

  return (
    <>
      {/* 로그인 폼 */}
      <div className="relative rounded-xl bg-white p-6 shadow-lg">
        {/* 타이틀 */}
        <h2 className="text-center text-2xl font-bold text-gray-800">로그인</h2>
        <p className="mb-6 mt-2 text-center text-sm text-gray-500">
          이메일 혹은 소셜로 로그인 하세요
        </p>
        {/* 소셜 로그인 버튼 */}
        <div className="mb-6 flex justify-center gap-3">
          {buttonList.map((button, index) => (
            <button
              key={index}
              className="rounded-full bg-gray-100 p-3 shadow transition hover:bg-gray-200"
              onClick={() => handleSubmitButton(button)}
            >
              <i className={`fab fa-${button.label} text-${button.color}-600`}></i>
            </button>
          ))}
        </div>

        {/* 이메일 및 비밀번호 입력 */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="email"
            type="text"
            control={control}
            placeholder="이메일을 입력하세요"
            errors={errors}
          />

          <Input
            className="w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="password"
            type="password"
            control={control}
            placeholder="비밀번호를 입력하세요"
            errors={errors}
          />

          <div className="text-right">
            <div className="text-sm text-indigo-500 hover:underline" onClick={handleClick}>
              비밀번호를 잃어버렸나요?
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-500 py-2 text-white transition hover:bg-indigo-600"
          >
            로그인
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
