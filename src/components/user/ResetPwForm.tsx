import { useForm } from 'react-hook-form';
import Input from './InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../common/Button';
import { useLocation } from 'react-router';
import { requestHandlerUser } from '../../api/usersApi/userHttp';

export const loginSchema = z.object({
  email: z
    .string({ message: '이메일을 입력하세요' })
    .nonempty({ message: '이메일을 입력하세요' })
    .email({ message: '이메일 형식이 아닙니다.' }),
  password: z
    .string({ message: '비밀번호를 입력하세요.' })
    .nonempty({ message: '비밀번호를 입력하세요' })
    .min(8, { message: '비밀번호는 8자 이상으로 입력하세요' })
    .max(16, { message: '비밀번호는 16자 이하로 입력하세요' }),
  passwordConfirm: z
    .string({ message: '확인 비밀번호를 입력하세요.' })
    .nonempty({ message: '확인 비밀번호를 입력하세요' }),
});

const ResetPwForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });

  const location = useLocation();
  const userData = location.state?.userData || null;

  const getEmailCheck = async (email: string | undefined) => {
    try {
      const response = await requestHandlerUser('post', '/users/email-check', { email: email });
      const responseCode = response.status;
      switch (responseCode) {
        case 200:
          alert('입력하신 이메일은 존재하지 않습니다.');
          break;
        case 406:
          alert('확인되었습니다. 변경하실 비밀번호를 입력해주세요.');
          break;
      }
    } catch (e) {
      console.error('Error:', e);
      alert('서버와의 통신에 문제가 발생했습니다.');
    }
  };

  const onSubmit = async (data: { email: string; password: string; passwordConfirm: string }) => {
    const formData = new FormData();
    {
      userData ? setValue('email', userData.email) : formData.append('email', data.email);
    }
    formData.append('password', data.password);
    formData.append('passwordConfirm', data.passwordConfirm);

    try {
      const response = await requestHandlerUser('put', '/users/change-password', formData);
      const responseCode = response.status;
      if (responseCode === 200) {
        alert('비��번호가 성공적으로 변경되었습니다.');
        setValue('email', '');
        setValue('password', '');
        setValue('passwordConfirm', '');
      } else {
        alert('비��번호 변경에 실��하��습니다.');
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
            placeholder="비밀번호를 입력하세요"
            errors={errors}
          />

          <Input
            name="passwordConfirm"
            type="password"
            control={control}
            placeholder="비밀번호를 확인해주세요"
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
            placeholder="비밀번호를 입력하세요"
            errors={errors}
          />

          <Input
            name="passwordConfirm"
            type="password"
            control={control}
            placeholder="비밀번호를 확인해주세요"
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
