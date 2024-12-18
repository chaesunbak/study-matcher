import { useEffect, useState } from 'react';
import { User } from '../models/user.model';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../components/user/InputForm';
import { formatDateYyyyMmDd } from '../utils/format';
import { useNavigate } from 'react-router';

interface UserModify {
  user_id: string;
}

const ModifySchema = z.object({
  id: z.number().optional(),
  email: z
    .string({ message: '이메일을 입력하세요.' })
    .nonempty({ message: '이메일을 입력하세요' })
    .email({ message: '이메일 형식이 아닙니다.' }),
  gender: z.enum(['male', 'female'], { message: '성별을 선택하세요.' }),
  birthdate: z
    .string({ message: '생년월일을 입력하세요.' })
    .nonempty({ message: '생년월일을 입력하세요' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: '올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)' }),
  profile_img: z.any().optional(),
  introduction: z.string().optional(),
});

const UserModify = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    setValue,
  } = useForm<z.infer<typeof ModifySchema>>({
    resolver: zodResolver(ModifySchema),
    defaultValues: {
      email: '',
      gender: 'male',
      birthdate: '',
      introduction: '',
    },
  });
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const local = localStorage.getItem('register');
    if (local) {
      const parsedData = JSON.parse(local);
      setUserData(parsedData.newUser);

      setValue('email', parsedData.newUser.email);
      setValue('gender', parsedData.newUser.gender);
      setValue('birthdate', formatDateYyyyMmDd(parsedData.newUser.birthdate));
      setValue('introduction', parsedData.newUser.introduction);
    }
  }, [setValue]);

  const onSubmit = (data: z.infer<typeof ModifySchema>) => {
    const newUser = {
      id: userData?.id,
      email: data.email,
      password: userData?.password || '',
      gender: data.gender,
      birthdate: data.birthdate,
      profile_img: data?.profile_img || '',
      introduction: data.introduction || '',
      created_at: userData?.created_at || new Date(),
    };
    localStorage.setItem('register', JSON.stringify({ newUser }));
    alert('회원 정보가 수정되었습니다!');
    navigate(`/`);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2/3 max-w-screen-md rounded-lg bg-gray-100 p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-3xl font-semibold text-gray-800">회원 정보 수정</h2>

        {/* 이메일 */}
        <div className="mb-6">
          <label className="mb-2 block text-gray-700">이메일</label>
          <Input type="text" name="email" control={control} errors={errors} />
        </div>

        {/* 성별 */}
        <div className="mb-6">
          <label className="mb-2 block text-gray-700">성별</label>
          <Input
            type="select"
            name="gender"
            control={control}
            options={[
              { value: '남성', label: '남성' },
              { value: '여성', label: '여성' },
            ]}
            errors={errors}
          />
        </div>

        {/* 생년월일 */}
        <div className="mb-6">
          <label className="mb-2 block text-gray-700">생년월일</label>
          <Input type="date" name="birthdate" control={control} errors={errors} />
        </div>

        {/* 자기소개 */}
        <div className="mb-6">
          <Input type="textarea" name="introduction" control={control} errors={errors} />
        </div>

        {/* 프로필 이미지 */}
        <div className="mb-6">
          <label className="mb-2 block text-gray-700">프로필 이미지</label>
          <input
            {...register('profile_img')}
            type="file"
            className="w-full rounded-md border border-gray-300 px-4 py-3"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-gray-700"
          >
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserModify;
