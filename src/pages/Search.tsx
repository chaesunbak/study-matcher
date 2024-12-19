import { useEffect, useRef } from 'react';
import SearchInput from '../components/SearchInput';
import GroupSearchFilter from '../components/search/GroupSearchFilter';
import useMeetingsInfinite from '../hooks/useMeetingsInfinite';
import GroupSummary from '../components/GroupSummary';

const Search = () => {
  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useMeetingsInfinite();

  const observerRef = useRef<IntersectionObserver>();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const meetings = data?.pages.flatMap((page) => page.meeting) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <SearchInput />
      <GroupSearchFilter />
      <div className="flex flex-col gap-3 md:gap-5">
        {meetings.map((meeting) => (
          <GroupSummary key={meeting.id} meeting={meeting} />
        ))}

        {isFetching && !isFetchingNextPage && <div>로딩중...</div>}
        {!isFetching && meetings.length === 0 && <div>검색 결과가 없습니다.</div>}
        {isFetchingNextPage && <div>추가 데이터 로딩중...</div>}

        <div ref={loadMoreRef} className="h-10" />
      </div>
    </div>
  );
};

export default Search;
