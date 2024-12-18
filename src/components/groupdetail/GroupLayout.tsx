import GroupDetailHeader from './GroupDetailHeader';
import { Outlet } from 'react-router';
import useMeeting from '../../hooks/useMeeting';
import { useParams } from 'react-router';

const GroupLayout = () => {
  const { group_id } = useParams();

  const { meeting } = useMeeting(Number(group_id));

  // TODO : 후에 404 작업
  if (!meeting) {
    return (
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
        404
        <div className="flex flex-col gap-4 md:col-span-2">404</div>
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
