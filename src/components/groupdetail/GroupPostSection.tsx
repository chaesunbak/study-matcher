import { Link, useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { formatDate } from '../../utils/format';
import useMeetingPosts from '../../hooks/userPosts';
import { PostWithUser } from '../../models/post.model';
import { deletePostData } from '../../api/posts.api';
import { useUserStore } from '../../store/userStore';

interface GroupPostSectionProps {
  preview?: boolean;
}

const GroupPostSection = ({ preview = false }: GroupPostSectionProps) => {
  const { group_id } = useParams();
  const { posts, total, refetch } = useMeetingPosts(Number(group_id));
  const navigate = useNavigate();
  const postsToShow = preview ? posts.slice(0, 4) : posts;
  const { sub } = useUserStore((state) => state.user_info);

  const handlePut = (post: PostWithUser) => {
    navigate(`/groups/${group_id}/posts/write`, { state: post });
  };

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제 하시겠습니까?') == true) {
      deletePostData(id).then((status) => {
        switch (status) {
          case 200:
            alert('삭제 되었습니다.');
            refetch();
            break;
        }
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h3>게시글 {total}</h3>
        {preview && (
          <Link
            className="font-normal text-gray-500 underline-offset-1 hover:underline"
            to={`/groups/${group_id}/posts`}
          >
            더보기 &gt;
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {postsToShow.map((post) => (
          <div
            key={post.id}
            className="flex items-start justify-between border-b border-gray-500 pb-4"
          >
            <Link to={`/groups/${group_id}/posts/${post.id}`}>
              <div className="flex gap-4">
                <div>
                  <h4 className="hover:underline">{post.title}</h4>
                  <p>{post.content}</p>
                  <div className="flex gap-2 text-sm font-normal text-gray-500">
                    <span>{post.user.username}</span>
                    <span>{formatDate(new Date(post.created_at))}</span>
                  </div>
                </div>
              </div>
            </Link>
            {sub === post.user_id && (
              <div className="flex gap-4">
                <button
                  onClick={() => handlePut(post)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupPostSection;
