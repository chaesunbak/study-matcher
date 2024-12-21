import CategoryButton from '../CategoryButton';
import { useSearchParams } from 'react-router';
import useTopics from '../../hooks/useTopics';

const GroupSearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { topics = [] } = useTopics();

  const topicsWithAll = [{ id: 0, name: '전체' }, ...topics];

  return (
    <div>
      <div className="mb-2">
        <h3 className="mb-2">카테고리</h3>
        <div className="flex flex-wrap gap-2">
          {topicsWithAll.map((topic) => (
            <CategoryButton
              key={topic.id}
              category={topic.name}
              onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set('topic', topic.id.toString());
                setSearchParams(newSearchParams);
              }}
              isActive={topic.id === parseInt(searchParams.get('topic') || '0', 10)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2">필터</h3>
        <div className="flex gap-2">
          <CategoryButton
            category="진행중인 모임만"
            onClick={() => {
              if (searchParams.has('ongoingOnly')) {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.delete('ongoingOnly');
                setSearchParams(newSearchParams);
                return;
              }
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set('ongoingOnly', 'true');
              setSearchParams(newSearchParams);
            }}
            isActive={searchParams.has('ongoingOnly')}
          />
          <CategoryButton
            category="참여가능한 모임만"
            onClick={() => {
              if (searchParams.has('availableOnly')) {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.delete('availableOnly');
                setSearchParams(newSearchParams);
                return;
              }
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set('availableOnly', 'true');
              setSearchParams(newSearchParams);
            }}
            isActive={searchParams.has('availableOnly')}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupSearchFilter;
