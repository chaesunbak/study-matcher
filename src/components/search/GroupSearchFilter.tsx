import CategoryButton from '../CategoryButton';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
import useTopics from '../../hooks/useTopics';

const GroupSearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { topics = [], loading, error } = useTopics();

  useEffect(() => {
    if (!searchParams.get('category')) {
      setSearchParams({ category: '전체', sort: 'recommend' });
    }
  }, [searchParams, setSearchParams]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="mb-2">
        <h3 className="mb-2">카테고리</h3>
        <div className="flex flex-wrap gap-2">
          {!loading &&
            topics.map((topic) => (
              <CategoryButton
                key={topic.id}
                category={topic.name}
                onClick={() => {
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.set('category', topic.name);
                  setSearchParams(newSearchParams);
                }}
                isActive={topic.name === searchParams.get('category')}
              />
            ))}
        </div>
      </div>

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
