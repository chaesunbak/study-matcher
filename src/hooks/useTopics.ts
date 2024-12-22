import { Topic } from '../models/topic.model';
import { getTopics } from '../api/topcis.api';
import { useQuery } from '@tanstack/react-query';

const useTopics = () => {
  // useQuery 훅을 사용하여 토픽 데이터를 가져옵니다.
  const {
    data: topics,
    isLoading: loading,
    error,
  } = useQuery<Topic[], Error>({
    queryKey: ['topics'], // 쿼리 키를 설정합니다.
    queryFn: getTopics, // 데이터를 가져오는 함수입니다.
    staleTime: Infinity, // 데이터가 오래된 것으로 간주되지 않도록 설정합니다.
    gcTime: Infinity, // 캐시된 데이터가 무기한 유지되도록 설정합니다.
  });

  // 토픽 데이터, 로딩 상태, 에러 메시지를 반환합니다.
  return { topics: topics || [], loading, error: error ? error.message : null };
};

export default useTopics;
