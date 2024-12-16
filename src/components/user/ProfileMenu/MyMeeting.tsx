import { User } from '../../../models/user.model';
import { Meeting } from '../../../models/meeting.model';
import dummyPostings, { dummyMeetings } from '../../../data';
import { formatDate } from '../../../utils/format';

interface MyMeetingProps {
  user: User;
}

const MyMeeting = ({ user }: MyMeetingProps) => {
  // 내가 생성한 모임 필터링
  const createdMeetings: Meeting[] = dummyMeetings.filter(
    (meeting) => meeting.owner_user_id === user.id
  );

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-semibold">내가 생성한 모임</h2>
      {createdMeetings.length > 0 ? (
        createdMeetings.map((meeting) => {
          // 작성한 게시글 개수
          const userPosts = dummyPostings.filter(
            (post) => post.meeting_id === meeting.id && post.user_id === user.id
          ).length;

          return (
            <div
              key={meeting.id}
              className="mb-4 flex items-center rounded-lg border bg-white p-4 shadow-md"
            >
              {/* 이미지 */}
              <img
                src={`https://via.placeholder.com/150`}
                alt={meeting.title}
                className="mr-4 h-16 w-24 rounded-lg object-cover"
              />

              {/* 모임 정보 */}
              <div className="flex-1">
                <h3 className="text-lg font-medium">{meeting.title}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  생성 날짜: {formatDate(meeting.created_at)}
                </p>
                <p className="mt-1 text-sm text-gray-600">그룹장: {user.email}</p>
                <p className="mt-1 text-sm text-gray-600">작성한 게시글 개수: {userPosts}개</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-600">생성한 모임이 없습니다.</p>
      )}
    </div>
  );
};

export default MyMeeting;
