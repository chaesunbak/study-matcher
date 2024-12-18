import { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../components/user/InputForm';
import { useLocation, useNavigate } from 'react-router';
import { Gender } from '../components/user/SignUpForm';
import { requestHandlerUser } from '../api/usersApi/userHttp';

const ModifySchema = z.object({
  id: z.number().optional(),
  email: z
    .string({ message: '이메일을 입력하세요.' })
    .nonempty({ message: '이메일을 입력하세요' })
    .email({ message: '이메일 형식이 아닙니다.' }),
  username: z
    .string({ message: '닉네임을 입력하세요.' })
    .nonempty({ message: '닉네임을 입력하세요' }),
  gender: z.nativeEnum(Gender),
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
      gender: Gender.male,
      birthdate: '',
      introduction: '',
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state();

  useEffect(() => {
    setValue('email', userData.email);
    setValue('username', userData.username);
    setValue('gender', userData.gender);
    setValue('birthdate', userData.birthdate);
    setValue('introduction', userData.introduction);
  }, [setValue]);

  const postUserData = async (formData: FormData) => {
    try {
      const response = await requestHandlerUser('post', '/users/modify', formData);
      if (response.status === 201) {
        alert('회원가입 성공!');
        navigate('/');
      }
    } catch (e) {
      console.error('Error creating user:', e);
      alert('회원가입이 동작하지 않습니다.!');
      return;
    }
  };

  const onSubmit = (data: z.infer<typeof ModifySchema>) => {
    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('username', data.username);
    formData.append('gender', data.gender);
    formData.append('birthdate', data.birthdate);
    formData.append('profile_img', data.profile_img || '');
    formData.append('introduction', data.introduction || '');

    postUserData(formData);

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

        <div className="mb-6">
          <label className="mb-2 block text-gray-700">이메일</label>
          <Input type="text" name="email" control={control} errors={errors} />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-gray-700">닉네임</label>
          <Input type="text" name="username" control={control} errors={errors} />
        </div>

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

        <div className="mb-6">
          <label className="mb-2 block text-gray-700">생년월일</label>
          <Input type="date" name="birthdate" control={control} errors={errors} />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-gray-700">자기 소개</label>
          <Input type="textarea" name="introduction" control={control} errors={errors} />
        </div>

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
