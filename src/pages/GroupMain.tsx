import { useParams } from 'react-router';

const GroupMain = () => {
  const { group_id } = useParams();
  return <div>{group_id} : GroupMain</div>;
};

export default GroupMain;
