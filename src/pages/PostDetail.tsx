import { useParams } from 'react-router';
import Button from '../components/common/Button';
import usePost from '../hooks/usePost';

const PostDetail = () => {
  const { post_id } = useParams();
  const { post } = usePost(Number(post_id));
  console.log(post);

  // TODO : 404 페이지를 추가합니다.
  if (!post) {
    return <div>404</div>;
  }
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
        <form>
          <textarea
            className="mb-4 h-24 w-full rounded border border-gray-500 p-2"
            placeholder="댓글을 입력하세요"
          ></textarea>
          <div className="flex justify-end">
            <Button>댓글 등록</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
