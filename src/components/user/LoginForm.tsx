import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from './InputForm';
import { Link, useNavigate } from 'react-router';
import Button from '../common/Button';
import { useUserStore } from '../../store/userStore';
import { requestHandlerUser } from '../../api/usersApi/userHttp';

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
  const { loginUser } = useUserStore((state) => state.actions);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: { email: string; password: string }) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    try {
      const response = await requestHandlerUser('post', '/users/login', formData);
      const responseCode = response.status;
      if (responseCode === 200) {
        const { access_token } = response.data;
        const { user_info } = response.data;
        loginUser(user_info);
        sessionStorage.setItem('access_token', access_token);

        alert('로그인 성공!');
        navigate('/');
      } else if (responseCode === 401) {
        alert('비밀번호가 일치하지 않습니다.');
      } else if (responseCode === 404) {
        alert('존재하지 않는 이메일(아이디)입니다.');
      } else {
        alert('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 요청 중 에러 발생:', error);
      alert('서버와의 통신에 문제가 발생했습니다.');
    }
  };

  return (
    <>
      {/* 로그인 폼 */}
      <div className="relative rounded-xl bg-white md:p-2 lg:p-4">
        {/* 타이틀 */}
        <h2 className="text-center text-gray-800">로그인</h2>
        <p className="mb-6 mt-2 text-center text-gray-700">이메일과 비밀번호를 입력해주세요.</p>

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

          <div className="flex items-center justify-center text-right text-sm">
            <span className="whitespace-nowrap text-sm text-gray-700 sm:text-sm">
              비밀번호를 잊어버리셨나요?
            </span>
            {/* TODO /users/reset-password 는 로그인하지 않으면 접속 불가 */}
            <Link
              to="/users/reset-password"
              className="text-blue-400 ml-2 cursor-pointer hover:underline"
            >
              재설정
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
