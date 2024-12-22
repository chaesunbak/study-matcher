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
import useRepliesPut from '../hooks/useRepliesPut';
import { useUserStore } from '../store/userStore';
import useRepliesDelete from '../hooks/useRepliesDelete';
import { Reply } from '../models/reply.model';

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
  const user = useUserStore((state) => state.user_info);
  const { post, refetch, error } = usePost(Number(post_id));
  const [replyData, setReplyData] = useState<postReplyFormDataType | null>(null);
  const [replyDataPut, setReplyDataPut] = useState<string>('');
  const [replyId, setReplyId] = useState<number>(0);
  const [replyIdDelete, setReplyIdDelete] = useState<number>(0);

  const { statusPost } = useReplies(replyData);
  const { statusPut } = useRepliesPut(replyDataPut, replyId);
  const { statusDelete } = useRepliesDelete(replyIdDelete);

  const onSubmit = (data: { reply: string }) => {
    if (replyId) {
      setReplyDataPut(data.reply);
      setValue('reply', '');
      return;
    }
    const formDataPost: postReplyFormDataType = {
      post_id: Number(post_id),
      content: data.reply,
      parent_reply_id: null,
    };

    setReplyData(formDataPost);
    setValue('reply', '');
  };

  useEffect(() => {
    if (statusPost === 201) {
      refetch().then(() => setReplyData(null));
    } else if (statusPut === 200) {
      alert('수정 되었습니다.');
      refetch().then(() => {
        setReplyId(0), setReplyDataPut('');
        setValue('reply', '');
      });
    } else if (statusDelete === 200) {
      alert('삭제 되었습니다.');
      refetch();
    }
  }, [statusPost, refetch, onSubmit, statusPut, statusDelete]);

  if (error || !post) return <div>404</div>;

  const handleClick = (reply: Reply) => {
    setValue('reply', reply.content);
    setReplyId(reply.id);
  };

  const handleClickDelete = (reply: Reply) => {
    setReplyIdDelete(reply.id);
  };

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
        <div>
          {post.replies.map((reply) =>
            reply.is_show ? (
              <div
                key={reply.id}
                className="mb-4 flex items-start justify-between border-b border-gray-200 pb-4"
              >
                <div>
                  <div className="mb-2 flex items-center text-gray-600">
                    <span className="mr-2">익명</span>
                    <span>{new Date(reply.created_at).toLocaleString()}</span>
                  </div>
                  <p className="leading-relaxed text-gray-500">{reply.content}</p>
                </div>
                {user.sub === reply.user_id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleClick(reply)}
                      className="text-blue-500 text-sm hover:underline"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleClickDelete(reply)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ) : null
          )}
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
            <Button type="submit">{replyId ? '댓글 수정' : '댓글 등록'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
