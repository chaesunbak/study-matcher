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
      // TODO : 정렬과 관련한 기능은 나중에 구현할 예정입니다
      {/* <div>
        <h3 className="mb-2">정렬</h3>
        <div className="flex gap-2">
          {SortList.map((sort) => (
            <CategoryButton
              key={sort.value}
              category={sort.label}
              onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set('sort', sort.value);
                setSearchParams(newSearchParams);
              }}
              isActive={sort.value === searchParams.get('sort')}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default GroupSearchFilter;
