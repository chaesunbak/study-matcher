import GroupDetailHeader from './GroupDetailHeader';
import { Outlet } from 'react-router';
import useMeeting from '../../hooks/useMeeting';
import { useParams } from 'react-router';
import SkeletonGroupDetailHeader from '../skeleton/SkeletonGroupDetailHeader';
import SkeletonGroupMemberSection from '../skeleton/SkeletonGroupMemberSection';
import ErrorComponent from '../common/ErrorComponent';

const GroupLayout = () => {
  const { group_id } = useParams();

  const { meeting, loading, error } = useMeeting(Number(group_id));
  console.log(meeting);
  console.log(loading);
  console.log(error);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
        <SkeletonGroupDetailHeader />
        <div className="flex flex-col gap-4 md:col-span-2">
          <SkeletonGroupMemberSection />
          <SkeletonGroupMemberSection />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <ErrorComponent message={error} />
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <ErrorComponent message="그룹을 찾을 수 없습니다." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
      <GroupDetailHeader group={meeting} />

      <div className="flex flex-col gap-4 md:col-span-2">
        <Outlet context={{ meeting }} />
      </div>
    </div>
  );
};

export default GroupLayout;
