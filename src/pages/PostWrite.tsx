import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router';
import Button from '../components/common/Button';
import Input from '../components/user/InputForm';

const postSchema = z.object({
  title: z.string().nonempty('제목을 입력해주세요.'),
  img: z.string().optional(),
  content: z.string().nonempty('내용을 입력해주세요.'),
});

type PostFormData = z.infer<typeof postSchema>;

const PostWrite = () => {
  const { group_id } = useParams();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    console.log(data);
    // 여기서 폼 데이터를 제출하는 로직을 추가하세요.
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">{group_id} Write Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label htmlFor="title" className="font-medium">
          제목
        </label>
        <Input
          name="title"
          type="text"
          placeholder="제목을 입력해주세요."
          control={control}
          errors={errors}
        />
        <label htmlFor="content" className="font-medium">
          내용
        </label>
        <Input
          name="content"
          type="textarea"
          placeholder="내용을 입력해주세요."
          control={control}
          errors={errors}
        />
        <Button className="w-full" type="submit">
          작성하기
        </Button>
      </form>
    </div>
  );
};

export default PostWrite;
