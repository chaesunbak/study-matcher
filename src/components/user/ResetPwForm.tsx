import { useForm } from 'react-hook-form';
import Input from './InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../common/Button';
import { useLocation, useNavigate } from 'react-router';
import { requestHandlerUser } from '../../api/usersApi/userHttp';
import { useState } from 'react';

export const loginSchema = z
  .object({
    email: z
      .string({ message: '이메일을 입력하세요' })
      .email({ message: '이메일 형식이 아닙니다.' })
      .optional(),

    password: z
      .string({ message: '비밀번호를 입력하세요.' })
      .nonempty({ message: '비밀번호를 입력하세요' })
      .min(8, { message: '비밀번호는 8자 이상으로 입력하세요' })
      .max(16, { message: '비밀번호는 16자 이하로 입력하세요' }),
    targetPassword: z
      .string({ message: '확인 비밀번호를 입력하세요.' })
      .nonempty({ message: '확인 비밀번호를 입력하세요' }),
    targetPasswordConfirm: z
      .string({ message: '확인 비밀번호를 입력하세요.' })
      .nonempty({ message: '확인 비밀번호를 입력하세요' }),
  })
  .refine((data) => data.targetPassword === data.targetPasswordConfirm, {
    message: '변경할 비밀번호가 일치하지 않습니다.',
    path: ['targetPasswordConfirm'],
  });

const ResetPwForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });

  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.state;
  const [emailCheck, setEmailCheck] = useState(false);

  const getEmailCheck = async (email: string | undefined) => {
    try {
      const response = await requestHandlerUser('post', '/users/email-check', { email: email });
      const responseCode = response.status;
      switch (responseCode) {
        case 200:
          alert('입력하신 이메일은 존재하지 않습니다.');
          break;
      }
    } catch (e: any) {
      console.error('Error:', e);
      switch (e.status) {
        case 406:
          setEmailCheck(true);
          alert('사용 가능한 이메일입니다.');
      }
    }
  };

  const onSubmit = async (data: {
    email?: string;
    password: string;
    targetPassword: string;
    targetPasswordConfirm: string;
  }) => {
    if (!emailCheck && !userData) {
      setEmailCheck(false);
      alert('이메일을 확인해주세요');
      return;
    }

    const formData = new FormData();
    formData.append('password', data.password);
    formData.append('target_password', data.targetPassword);

    try {
      const response = await requestHandlerUser('put', '/users/change-password', formData);
      console.log(response);
      const responseCode = response.status;
      if (responseCode === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요.');
        sessionStorage.removeItem('access_token');
        navigate('/login');
      } else {
        alert('비밀번호 변경에 실패하였습니다.');
      }
    } catch (e) {
      console.error('Error:', e);
      alert('서버와의 통신에 문제가 발생했습니다.');
    }
  };

  const handleButton = () => {
    const emailCheck = getValues('email');
    getEmailCheck(emailCheck);
  };

  return (
    <div className="relative rounded-xl bg-white p-6 shadow-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800">비밀번호 재설정</h2>
      <p className="mb-6 mt-2 text-center text-sm text-gray-500">원하시는 비밀번호로 변경하세요.</p>

      {userData ? (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="password"
            type="password"
            control={control}
            placeholder="원래 비밀번호를 입력하세요."
            errors={errors}
          />

          <Input
            name="targetPassword"
            type="password"
            control={control}
            placeholder="새로운 비밀번호를 입력하세요"
            errors={errors}
          />

          <Input
            name="targetPasswordConfirm"
            type="password"
            control={control}
            placeholder="새로운 비밀번호를 확인해주세요"
            errors={errors}
          />

          <Button variant="form" type="submit">
            비밀번호 변경
          </Button>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            type="text"
            control={control}
            placeholder="이메일을 입력하세요"
            errors={errors}
            hasButton={true}
            buttonLabel="확인"
            onButtonClick={handleButton}
            className="w-2/3"
          />

          <Input
            name="password"
            type="password"
            control={control}
            placeholder="원래 비밀번호를 입력하세요."
            errors={errors}
          />

          <Input
            name="targetPassword"
            type="password"
            control={control}
            placeholder="새로운 비밀번호를 입력하세요"
            errors={errors}
          />

          <Input
            name="targetPasswordConfirm"
            type="password"
            control={control}
            placeholder="새로운 비밀번호를 확인해주세요"
            errors={errors}
          />

          <Button variant="form" type="submit">
            비밀번호 변경
          </Button>
        </form>
      )}
    </div>
  );
};

export default ResetPwForm;
