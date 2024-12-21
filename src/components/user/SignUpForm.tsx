import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from './InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import Button from '../common/Button';
import { requestHandlerUser } from '../../api/usersApi/userHttp';
import { useState } from 'react';
import { AxiosError } from 'axios';

export enum Gender {
  male = '남성',
  female = '여성',
}

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
    username: z
      .string({ message: '닉네임을 입력하세요.' })
      .nonempty({ message: '닉네임을 입력하세요.' }),
    gender: z.nativeEnum(Gender),
    birthdate: z
      .string({ message: '생년월일을 입력하세요.' })
      .nonempty({ message: '생년월일을 입력하세요' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: '올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)' }),
    // profile_img: z.any(),
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
    getValues,
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
  const [isChecked, setIsChecked] = useState(false);

  const postUserData = async (formData: FormData) => {
    try {
      const response = await requestHandlerUser('post', '/users/signup', formData);
      if (response.status === 201) {
        alert('회원가입 성공!');
        navigate('/login');
      }
    } catch (e) {
      console.error('Error creating user:', e);
      alert('회원가입이 동작하지 않습니다.!');
      return;
    }
  };

  const onSubmit = (data: z.infer<typeof SignUpSchema>, e) => {
    if (!isChecked) {
      e.preventDefault();
      console.log('data', data);
      alert('메일을 확인해주세요.');
      return;
    }
    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('username', data.username);
    formData.append('gender', data.gender);
    formData.append('birth_date', data.birthdate);
    formData.append('profile_img', '/images/123');
    formData.append('introduction', data.introduction || '');

    postUserData(formData);
  };

  const getEmailCheck = async (emailCheck: string) => {
    try {
      const response = await requestHandlerUser('post', `/users/email-check`, {
        email: emailCheck,
      });
      const responseCode = response.status;
      switch (responseCode) {
        case 200:
          alert('사용할 수 있는 이메일 입니다.');
          setIsChecked(true);
          break;
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 406) {
          alert('중복된 이메일입니다.');
        }
      } else {
        console.error('Unknown error:', e);
      }
    }
  };

  const handleButton = () => {
    const emailCheck = getValues('email');
    getEmailCheck(emailCheck);
  };

  // const handleFileChange = (file: File) => {
  //   setValue('profile_img', file);
  // };

  return (
    <div>
      <div className="relative rounded-xl bg-white md:p-2 lg:p-4">
        <h2 className="text-center text-gray-700">회원가입</h2>
        <p className="mb-6 mt-2 text-center text-gray-700">이메일과 비밀번호를 입력해주세요</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <label className="block text-sm font-medium text-gray-700">이메일</label>
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
          <label className="block text-sm font-medium text-gray-700">비밀번호</label>
          <Input
            name="password"
            type="password"
            control={control}
            placeholder="비밀번호를 입력하세요"
            errors={errors}
          />
          <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
          <Input
            name="passwordConfirm"
            type="password"
            control={control}
            placeholder="비밀번호를 확인해주세요"
            errors={errors}
          />
          <label className="block text-sm font-medium text-gray-700">닉네임</label>
          <Input
            name="username"
            type="text"
            control={control}
            placeholder="닉네임을 설정해주세요"
            errors={errors}
          />

          <label className="block text-sm font-medium text-gray-700">성별</label>
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

          <label className="block text-sm font-medium text-gray-700">생년 월일</label>
          <Input
            name="birthdate"
            type="date"
            control={control}
            placeholder="생년월일을 입력하세요"
            errors={errors}
          />

          {/* <label className="block text-sm font-medium text-gray-700">프로필 이미지</label>
          <Input
            name="profile_img"
            type="image"
            control={control}
            errors={errors}
            onChange={(file) => {
              handleFileChange(file);
            }}
            setValue={setValue}
          /> */}

          <label className="block text-sm font-medium text-gray-700">자기 소개</label>
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
