import { useParams } from 'react-router';
import Button from '../components/common/Button';
import usePost from '../hooks/usePost';
import Input from '../components/user/InputForm';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useReplies from '../hooks/useReplies';
import { useEffect, useState } from 'react';
import { postReplyFormDataType } from '../models/post.model';

export const PostDetailReplyScheme = z.object({
  reply: z.string({ message: '댓글을 입력하세요' }),
});

const PostDetail = () => {
  const { post_id } = useParams();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<z.infer<typeof PostDetailReplyScheme>>({
    resolver: zodResolver(PostDetailReplyScheme),
  });

  const { post, isLoading, refetch, error } = usePost(Number(post_id));
  const [replyData, setReplyData] = useState<postReplyFormDataType | null>(null);

  const { status, loading: replyLoading, replyError } = useReplies(replyData);

  const onSubmit = (data: { reply: string }) => {
    const formData: postReplyFormDataType = {
      post_id: Number(post_id),
      content: data.reply,
      parent_reply_id: null,
    };

    setReplyData(formData);
    setValue('reply', '');
  };

  useEffect(() => {
    if (status === 201) {
      refetch().then((res) => setReplyData(null));
    }
  }, [status, refetch, onSubmit]);

  if (error || !post) return <div>404</div>;

  return (
    <div className="container mx-auto">
      <div className="mb-6 rounded">
        <h2 className="mb-2 font-bold">{post.title}</h2>
        <div className="mb-4 flex items-center gap-2 font-thin text-gray-500">
          <span>{post.user.username}</span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        <p className="text-lg leading-relaxed">{post.content}</p>
        <div></div>
      </div>
      <div className="mb-6 rounded">
        {/* 이부분은 댓글 모델을 정의한 뒤 추가작업이 필요합니다 */}
        <div>
          {post.replies.map((reply) => (
            <div key={reply.id} className="mb-4 pb-4">
              <div className="mb-2 flex items-center text-gray-600">
                <span className="mr-2">닉네임</span>
                <span>{reply.created_at.toLocaleString()}</span>
              </div>
              <p className="leading-relaxed text-gray-500">{reply.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="reply"
            type="textarea"
            placeholder="댓글을 입력하세요"
            control={control}
            errors={errors}
            isReply={true}
          />
          <div className="flex justify-end">
            <Button type="submit">댓글 등록</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
