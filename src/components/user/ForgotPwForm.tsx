import { useForm } from 'react-hook-form';
import Input from './InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { httpClient } from '../../api/http';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: '이메일을 입력하세요' })
    .email({ message: '이메일 형식이 아닙니다.' }),
  verificationCode: z.string().optional(),
});

const ForgotPwForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [password, setPassword] = useState<string | null>(null);

  const handleEmailSubmit = (data: { email: string }) => {
    const local = localStorage.getItem('register');
    if (local) {
      const registerData = JSON.parse(local);
      if (data.email === registerData.email) {
        setPassword(registerData.password); // 저장된 비밀번호 가져오기
        httpClient.post('/verification-request', { email: data.email });
        alert('인증 요청이 전송되었습니다.');
        setShowVerificationInput(true);
      } else {
        alert('일치하는 이메일이 없습니다.');
      }
    } else {
      alert('등록된 사용자가 없습니다.');
    }
  };

  const handleVerificationSubmit = (data: { verificationCode?: string }) => {
    if (data.verificationCode) {
      // 인증 성공 시 처리
      httpClient.post('/verify', { code: data.verificationCode }).then((response) => {
        if (response) {
          setShowVerificationInput(false);
        } else {
          alert('인증 실패 : 인증 번호가 일치하지 않습니다.');
        }
      });
      alert('인증되었습니다.');
      setIsVerified(true);
      reset(); // 폼 초기화
    } else {
      alert('인증번호를 입력하세요.');
    }
  };

  return (
    <div>
      <div className="relative rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">비밀번호 찾기</h2>
        <p className="mb-6 mt-2 text-center text-sm text-gray-500">이메일을 입력하세요</p>

        {!isVerified && (
          <>
            {/* 이메일 제출 폼 */}
            <form onSubmit={handleSubmit(handleEmailSubmit)} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  name="email"
                  type="text"
                  control={control}
                  placeholder="이메일을 입력하세요"
                  errors={errors}
                />
                <button
                  type="submit"
                  className="bg-indigo-400 hover:bg-indigo-600 rounded-lg px-4 py-2 text-white transition"
                >
                  인증 요청
                </button>
              </div>
            </form>

            {/* 인증 코드 제출 폼 */}
            {showVerificationInput && (
              <form
                onSubmit={handleSubmit((data) =>
                  handleVerificationSubmit({ verificationCode: data.verificationCode })
                )}
                className="mt-4"
              >
                <div className="flex items-center space-x-2">
                  <Input
                    name="verificationCode"
                    type="text"
                    control={control}
                    placeholder="인증번호를 입력하세요"
                    errors={errors}
                  />
                  <button
                    type="submit"
                    className="bg-green-400 hover:bg-green-600 rounded-lg px-4 py-2 text-white transition"
                  >
                    인증
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {/* 인증 완료 시 비밀번호 표시 */}
        {isVerified && password && (
          <p className="mt-6 text-center text-lg text-gray-800">
            {`비밀번호: `}
            <span className="text-indigo-500 font-bold">{password}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPwForm;
