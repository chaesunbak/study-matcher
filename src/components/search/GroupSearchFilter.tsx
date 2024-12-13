import CategoryButton from '../CategoryButton';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';

const CATEGORY_LIST = [
  '전체',
  '운동',
  '자기계발',
  '동네친구',
  '아웃도어/여행',
  '가족/육아',
  '반려동물',
  '음식/음료',
  '취미/오락',
  '독서/인문학',
  '문화/예술',
  '음악/악기',
  '기타',
];

const SortList = [
  { value: 'recommend', label: '추천순' },
  { value: 'recent', label: '신규순' },
];

const GroupSearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('category')) {
      setSearchParams({ category: '전체', sort: 'recommend' });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div>
      <div className="mb-2">
        <h3 className="mb-2">카테고리</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_LIST.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set('category', category);
                setSearchParams(newSearchParams);
              }}
              isActive={category === searchParams.get('category')}
            />
          ))}
        </div>
      </div>

      <div>
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
      </div>
    </div>
  );
};

export default GroupSearchFilter;
