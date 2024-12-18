import { Link } from 'react-router';
import { Posting } from '../../models/post.model';
import { useParams } from 'react-router';
import { formatDate } from '../../utils/format';

interface GroupPostSectionProps {
  posts: Posting[];
  preview?: boolean;
}

const GroupPostSection = ({ posts, preview = false }: GroupPostSectionProps) => {
  const { group_id } = useParams();
  const postsToShow = preview ? posts.slice(0, 4) : posts;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h3>게시글 {posts.length}</h3>
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
          <Link key={post.id} to={`/groups/${group_id}/posts/${post.id}`}>
            <div key={post.id} className="flex gap-4">
              <div>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <div className="flex gap-2 text-sm font-light text-gray-500">
                  <span>닉네임</span>
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GroupPostSection;
