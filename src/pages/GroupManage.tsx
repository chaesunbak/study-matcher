import { useParams } from 'react-router';

const GroupManage = () => {
  const { group_id } = useParams();
  return (
    <div>
      <h1>{group_id} : GroupManage</h1>
    </div>
  );
};

export default GroupManage;
