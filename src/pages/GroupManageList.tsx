import { useParams } from 'react-router';

const GroupManageList = () => {
  const { group_id } = useParams();
  return (
    <div>
      <h1>{group_id} : GroupManageList</h1>
    </div>
  );
};

export default GroupManageList;
