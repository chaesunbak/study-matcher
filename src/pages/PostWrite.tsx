import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate, useParams } from 'react-router';
import Button from '../components/common/Button';
import Input from '../components/user/InputForm';
import { postPostFromDataType } from '../models/post.model';
import { putPostData, setPostData } from '../api/posts.api';
import { useEffect } from 'react';

const postSchema = z.object({
  meeting_id: z.string(),
  title: z.string().nonempty('제목을 입력해주세요.'),
  img: z.any(),
  content: z.string().nonempty('내용을 입력해주세요.'),
});

type PostFormData = z.infer<typeof postSchema>;

const PostWrite = () => {
  const { group_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const postData = location;
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      meeting_id: group_id,
    },
  });

  const onSubmit = (data: PostFormData) => {
    if (postData.state) {
      const formData = {
        title: data.title,
        img: '/images/default',
        content: data.content,
      };

      putPostData(formData, postData.state.id).then((status) => {
        switch (status) {
          case 200:
            alert('수정 되었습니다.');
            navigate(`/groups/${group_id}`);
            break;
        }
      });

      return;
    }

    const formData: postPostFromDataType = {
      meeting_id: parseInt(data.meeting_id),
      title: data.title,
      img: '/images/default',
      content: data.content,
    };

    setPostData(formData).then((data) => {
      switch (data) {
        case 201:
          alert('작성되었습니다.!');
          navigate(`/groups/${group_id}`);
          break;
        case 400:
          alert('게시글 작성을 실패했습니다.!');
          break;
        default:
          alert('서버 에러');
          break;
      }
    });
  };

  useEffect(() => {
    if (location.state) {
      setValue('title', postData.state.title);
      setValue('content', postData.state.content);
    }
  }, [location.state]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">글 작성하기</h2>
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
        <Button className="w-full" type="submit" variant="form">
          {location.state ? '수정하기' : '작성하기'}
        </Button>
      </form>
    </div>
  );
};

export default PostWrite;
