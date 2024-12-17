import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from './InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import Button from '../common/Button';
import { Gender, User } from '../../models/user.model';

const SignUpSchema = z
  .object({
    id: z.number().optional(),
    email: z
      .string({ message: '이메일을 입력하세요.' })
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
    gender: z.nativeEnum(Gender),
    birthdate: z
      .string({ message: '생년월일을 입력하세요.' })
      .nonempty({ message: '생년월일을 입력하세요' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: '올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)' }),
    profile_img: z.any().optional(),
    introduction: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

const SignUpForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      gender: Gender.male,
      birthdate: '',
      introduction: '',
    },
  });
  const navigate = useNavigate();

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    const newUser: User = {
      id: Date.now(), // 예시로 ID 생성
      email: data.email,
      password: data.password,
      gender: data.gender,
      birthdate: new Date(data.birthdate),
      profile_img: data.profile_img || '',
      introduction: data.introduction || '',
      created_at: new Date(),
    };

    localStorage.setItem('register', JSON.stringify({ newUser }));
    alert('회원가입 성공!');
    navigate('/login');
  };

  return (
    <div>
      <div className="relative rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">회원가입</h2>
        <p className="mb-6 mt-2 text-center text-sm text-gray-500">
          이메일과 비밀번호를 입력해주세요
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
          <Input
            name="passwordConfirm"
            type="password"
            control={control}
            placeholder="비밀번호를 확인해주세요"
            errors={errors}
          />
          <Input
            name="gender"
            type="select"
            control={control}
            options={[
              { value: '남성', label: '남성' },
              { value: '여성', label: '여성' },
            ]}
            placeholder="성별을 선택하세요"
            errors={errors}
          />
          <Input
            name="birthdate"
            type="date"
            control={control}
            placeholder="생년월일을 입력하세요"
            errors={errors}
          />
          {/* 파일 업로드 필드 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">프로필 이미지</label>
            <input
              type="file"
              {...register('profile_img')}
              className="focus:ring-indigo-500 mt-1 w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2"
            />
            {errors.profile_img && (
              <p className="text-red-500 mt-1 text-sm">{String(errors.profile_img.message)}</p>
            )}
          </div>
          <Input
            name="introduction"
            type="textarea"
            control={control}
            placeholder="자기소개를 입력해주세요"
            errors={errors}
          />
          <Button variant="form" type="submit">
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
