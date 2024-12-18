// import { useParams } from 'react-router';
import GroupDetailHeader from './GroupDetailHeader';
import { Outlet } from 'react-router';
import { dummyMeetingDetail, dummyPosts } from '../../data';

const GroupLayout = () => {
  const group = dummyMeetingDetail;
  const posts = dummyPosts;
  // const { group_id } = useParams();
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
      <GroupDetailHeader group={group} />
      <div className="flex flex-col gap-4 md:col-span-2">
        <Outlet context={{ group, posts }} />
      </div>
    </div>
  );
};

export default GroupLayout;
