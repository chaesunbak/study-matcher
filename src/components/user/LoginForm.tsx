import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from './InputForm';
import { Link, useNavigate } from 'react-router';
import Button from '../common/Button';
import { useUserStore } from '../../store/userStore';

export const loginSchema = z.object({
  email: z
    .string({ message: '이메일을 입력하세요.' })
    .nonempty({ message: '이메일을 입력하세요.' })
    .email({ message: '이메일 형식이 아닙니다.' }),
  password: z
    .string({ message: '비밀번호를 입력하세요.' })
    .nonempty({ message: '비밀번호를 입력하세요' })
    .min(8, { message: '비밀번호는 8자 이상으로 입력하세요' })
    .max(16, { message: '비밀번호는 16자 이하로 입력하세요' }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { userId } = useUserStore((state) => state); // 로그인 상태 확인
  const { loginUser } = useUserStore((state) => state.actions); // 로그인 액션 가져오기
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: { email: string; password: string }) => {
    const registerData = localStorage.getItem('register'); // 회원가입 정보 가져오기
    if (registerData) {
      const loginData = JSON.parse(registerData);

      // 이미 로그인된 상태인지 확인
      if (userId === data.email) {
        alert('이미 로그인 되었습니다');
        return;
      }

      // 이메일 및 비밀번호 확인
      if (loginData.newUser.email === data.email && loginData.newUser.password === data.password) {
        alert('로그인 성공');

        console.log('로그인 성공:', loginData.newUser.email);
        loginUser(loginData.newUser.email);
        navigate('/');
      } else {
        alert('로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다');
      }
    } else {
      alert('회원가입 정보가 없습니다. 먼저 회원가입을 진행해주세요.');
    }
  };

  return (
    <>
      {/* 로그인 폼 */}
      <div className="relative rounded-xl bg-white p-6 shadow-lg">
        {/* 타이틀 */}
        <h2 className="text-center text-2xl font-bold text-gray-800">로그인</h2>
        <p className="mb-6 mt-2 text-center text-sm text-gray-500">
          이메일과 비밀번호를 입력하세요
        </p>

        {/* 이메일 및 비밀번호 입력 */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            type="text"
            control={control}
            placeholder="이메일을 입력하세요"
            errors={errors}
          />

          <Input
            name="password"
            type="password"
            control={control}
            placeholder="비밀번호를 입력하세요"
            errors={errors}
          />

          <div className="flex items-center justify-center text-right text-sm text-gray-500">
            <span>비밀번호를 잊어버리셨나요?</span>
            <Link
              to="/forget-password"
              className="text-indigo-500 ml-2 cursor-pointer hover:underline"
            >
              비밀번호 찾기
            </Link>
          </div>
          <Button variant="form" type="submit">
            로그인
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
