import { getMeetings, getMeetingsParams, MeetingResponse } from '../api/meetings.api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';

const useMeetingsInfinite = () => {
  const [searchParams] = useSearchParams();

  const fetchMeetings = async ({
    pageParam = 1,
  }: {
    pageParam?: number;
  }): Promise<MeetingResponse> => {
    const keyword = searchParams.get('keyword') || undefined;
    const topicId = searchParams.get('topic');
    const params: getMeetingsParams = { page: pageParam, per_page: 10 };

    if (keyword) {
      params.keyword = keyword;
    }

    if (topicId) {
      params.topic_id = parseInt(topicId, 10);
    }

    return await getMeetings(params);
  };

  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['meetings', searchParams.toString()],
      queryFn: fetchMeetings,
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.totalPage) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
    });

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  return { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useMeetingsInfinite;
