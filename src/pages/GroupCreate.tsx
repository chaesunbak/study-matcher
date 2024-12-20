import Button from '../components/common/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useTopics from '../hooks/useTopics';
import Input from '../components/user/InputForm';
import { createMeeting } from '../api/meetings.api';
import { CreateMeetingParams } from '../api/meetings.api';
import { useNavigate } from 'react-router';

const groupCreateSchema = z.object({
  title: z.string().nonempty('모임 이름 입력해주세요.'),
  topic_id: z.string().nonempty('카테고리를 선택해주세요.'),
  description: z.string().nonempty('모임 설명을 입력해주세요.'),
  max_members: z.string().optional(),
  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식은 YYYY-MM-DD이어야 합니다.')
    .optional(),
  end_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식은 YYYY-MM-DD이어야 합니다.')
    .optional(),
});

type GroupFormData = z.infer<typeof groupCreateSchema>;

const GroupCreate = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem('access_token');
  const { topics } = useTopics();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupCreateSchema),
  });

  if (!accessToken) {
    navigate('/login');
  }

  //TODO: 에러처리를 추가합니다
  const onSubmit = async (data: GroupFormData) => {
    const params: CreateMeetingParams = {
      title: data.title,
      topic_id: parseInt(data.topic_id),
      description: data.description,
    };

    if (data.max_members) {
      params.max_members = parseInt(data.max_members);
    }

    if (data.start_date) {
      params.start_date = data.start_date;
    }

    if (data.end_date) {
      params.end_date = data.end_date;
    }

    await createMeeting(params).then((response) => {
      if (response.status === 201) {
        alert('모임이 생성되었습니다.');
      } else {
        alert('모임을 생성할 수 없습니다.');
      }
    });
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-4 p-4 md:w-9/12 lg:w-7/12">
      <h2>모임 만들기</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label htmlFor="title">모임 이름(필수)</label>
        <Input
          name="title"
          type="text"
          placeholder="모임 이름를 입력해주세요."
          control={control}
          errors={errors}
        />
        <label htmlFor="topic_id">카테고리(필수)</label>
        <Input
          name="topic_id"
          type="select"
          placeholder="카테고리를 선택해주세요."
          control={control}
          errors={errors}
          options={topics.map((topic) => ({
            value: topic.id.toString(),
            label: topic.name,
          }))}
        />
        <label htmlFor="description">모임 설명(필수)</label>
        <Input
          name="description"
          type="textarea"
          placeholder="모임 설명을 입력해주세요."
          control={control}
          errors={errors}
        />
        <label htmlFor="max_members">정원(선택)</label>
        <Input
          name="max_members"
          type="number"
          placeholder="정원을 입력해주세요.(선택)"
          control={control}
          errors={errors}
        />
        <label htmlFor="start_date">시작일(선택)</label>
        <Input
          name="start_date"
          type="text"
          placeholder="YYYY-MM-DD 형식으로 시작일을 입력해주세요.(선택)"
          control={control}
          errors={errors}
        />
        <label htmlFor="end_date">종료일(선택)</label>
        <Input
          name="end_date"
          type="text"
          placeholder="YYYY-MM-DD 형식으로 종료일을 입력해주세요.(선택)"
          control={control}
          errors={errors}
        />
        {/* <label htmlFor="gender_condition">성별 조건(선택)</label>
        <Input
          name="gender_condition"
          type="select"
          defaultValue="any"
          placeholder="성별 조건을 선택해주세요."
          control={control}
          errors={errors}
          options={[
            { value: 'any', label: '무관' },
            { value: 'male', label: '남성' },
            { value: 'female', label: '여성' },
          ]}
        />
        <label htmlFor="age_condition">나이 조건(선택)</label>
        <Input
          name="age_condition"
          type="text"
          placeholder="나이 조건을 입력해주세요."
          control={control}
          errors={errors}
        /> */}

        <Button className="w-full" type="submit">
          그룹 만들기
        </Button>
      </form>
    </div>
  );
};

export default GroupCreate;
