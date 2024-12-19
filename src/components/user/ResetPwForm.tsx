import { useForm } from 'react-hook-form';
import Input from './InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../common/Button';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: '이메일을 입력하세요' })
    .email({ message: '이메일 형식이 아닙니다.' }),
  verificationCode: z.string().optional(),
});

const ResetPwForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setError,
  } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });

  const handleEmailSubmit = async (data: { email: string }) => {};

  const onSubmit = async (data: { verificationCode?: string }) => {};

  return (
    <div className="relative rounded-xl bg-white p-6 shadow-lg">
      {/* 타이틀 */}
      <h2 className="text-center text-2xl font-bold text-gray-800">비밀번호 재설정</h2>
      <p className="mb-6 mt-2 text-center text-sm text-gray-500">원하시는 비밀번호로 변경하세요.</p>

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

        <Button variant="form" type="submit">
          로그인
        </Button>
      </form>
    </div>
  );
};

export default ResetPwForm;
