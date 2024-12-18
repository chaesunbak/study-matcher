// import { useParams } from 'react-router';
import Button from '../components/common/Button';

const PostDetail = () => {
  // const { group_id, post_id } = useParams();
  return (
    <div className="container mx-auto">
      <div className="mb-6 rounded">
        {/* <h2 className="mb-2 font-bold">{dummyPost.title}</h2> */}
        <div className="mb-4 flex items-center font-thin text-gray-500">
          <span className="mr-2">닉네임</span>
          {/* <span>{dummyPost.created_at.toLocaleString()}</span> */}
        </div>
        {/* <p className="text-lg leading-relaxed">{dummyPost.content}</p> */}
        <div></div>
      </div>
      <div className="mb-6 rounded">
        <div>
          {/* {dummyPost.replies.map((reply) => (
            <div key={reply.id} className="mb-4 pb-4">
              <div className="mb-2 flex items-center text-gray-600">
                <span className="mr-2">닉네임</span>
                <span>{reply.created_at.toLocaleString()}</span>
              </div>
              <p className="leading-relaxed text-gray-500">{reply.content}</p>
            </div>
          ))} */}
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
