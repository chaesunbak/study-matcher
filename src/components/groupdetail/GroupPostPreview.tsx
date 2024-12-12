import { Link } from 'react-router';
import { Posting } from '../../models/posting.model';
import { useParams } from 'react-router';

interface GroupPostPreviewProps {
  posts: Posting[];
}

const GroupPostPreview = ({ posts }: GroupPostPreviewProps) => {
  const { group_id } = useParams();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h3>게시글 {posts.length}</h3>
        <Link to={`/groups/${group_id}/posts`}>더보기</Link>
      </div>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id} className="flex gap-4">
            <div>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupPostPreview;
