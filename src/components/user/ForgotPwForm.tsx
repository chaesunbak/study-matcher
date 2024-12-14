import { useForm } from 'react-hook-form';
import Input from './InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: '이메일을 입력하세요' })
    .email({ message: '이메일 형식이 아닙니다.' }),
});

const ForgotPwForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [password, setPassword] = useState('');
  const local = localStorage.getItem('register');

  const onSubmit = (data: { email: string }) => {
    if (local) {
      const registerData = JSON.parse(local);
      if (data.email === registerData.email) {
        setIsEmailChecked(true);
        setPassword(registerData.password);
      } else {
        alert('일치하는 이메일이 없습니다.');
      }
    }
  };

  return (
    <div>
      {/* 로그인 폼 */}
      <div className="relative rounded-xl bg-white p-6 shadow-lg">
        {/* 타이틀 */}
        <h2 className="text-center text-2xl font-bold text-gray-800">비밀번호 찾기</h2>
        <p className="mb-6 mt-2 text-center text-sm text-gray-500">이메일을 입력하세요</p>

        {/* 이메일 및 비밀번호 입력 */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {isEmailChecked ? (
            <span>{password}</span>
          ) : (
            <Input
              className="focus:ring-indigo-500 w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2"
              name="email"
              type="text"
              control={control}
              placeholder="이메일을 입력하세요"
              errors={errors}
            />
          )}

          {isEmailChecked ? null : (
            <button
              type="submit"
              className="bg-indigo-300 hover:bg-indigo-600 w-full rounded-lg py-2 text-black transition"
            >
              찾기
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPwForm;
