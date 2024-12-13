// import { useParams } from 'react-router';
import GroupDetailHeader from './GroupDetailHeader';
import { dummyMeetingDetail, dummyPostings } from '../../data';
import { Outlet } from 'react-router';

const GroupLayout = () => {
  const group = dummyMeetingDetail;
  const posts = dummyPostings;
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
