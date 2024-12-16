import { useForm } from 'react-hook-form';
import Input from './InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
// import { httpClient } from '../../api/http';
import Button from '../common/Button';
import useEmailError from '../hooks/useEmailError';

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
    setError,
  } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const { emailError, setEmailError, resetEmailError } = useEmailError();

  const handleEmailSubmit = async (data: { email: string }) => {
    try {
      const local = localStorage.getItem('register');
      if (local) {
        const registerData = JSON.parse(local);
        if (data.email === registerData.email) {
          // 서버로 인증 요청 전송
          //   await httpClient.post('/verification-request', { email: data.email });
          alert('인증 요청이 전송되었습니다.');
          setShowVerificationInput(true);
          resetEmailError(); // 에러 메시지 초기화
        } else {
          setEmailError('존재하지 않는 이메일입니다.');
        }
      } else {
        setEmailError('존재하지 않는 이메일입니다.');
      }
    } catch (error) {
      setEmailError('서버와 통신 중 문제가 발생했습니다.');
    }
  };

  const handleVerificationSubmit = async (data: { verificationCode?: string }) => {
    if (data.verificationCode) {
      try {
        // 서버에 인증번호 전송 및 응답 처리
        // const response = await httpClient.post<{ password: string }>('/verify', {
        //   code: data.verificationCode,
        // });

        const response = { data: { password: 'qwe123qwe' } };

        if (response.data && response.data.password) {
          alert('인증되었습니다.');
          setPassword(response.data.password);
          setIsVerified(true);
          setShowVerificationInput(false);
          reset(); // 폼 초기화
        } else {
          setError('verificationCode', { message: '유효하지 않은 인증번호입니다.' });
        }
      } catch (error) {
        setError('verificationCode', { message: '인증 처리 중 문제가 발생했습니다.' });
      }
    } else {
      setError('verificationCode', { message: '인증번호를 입력하세요.' });
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
              <div>
                <div className="flex items-center space-x-2">
                  <Input
                    name="email"
                    type="text"
                    control={control}
                    placeholder="이메일을 입력하세요"
                    errors={errors}
                  />
                  <Button variant="verification" type="submit">
                    인증 요청
                  </Button>
                </div>
                {emailError && <p className="text-red-500 mt-2 text-sm">{emailError}</p>}
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
                <div>
                  <div className="flex items-center space-x-2">
                    <Input
                      name="verificationCode"
                      type="text"
                      control={control}
                      placeholder="인증번호를 입력하세요"
                      errors={errors}
                    />
                    <Button variant="verification" type="submit">
                      인증
                    </Button>
                  </div>
                  {errors.verificationCode && (
                    <p className="text-red-500 mt-2 text-sm">{errors.verificationCode.message}</p>
                  )}
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
