import SearchInput from '../components/SearchInput';
import TopicCarousel from '../components/TopicCarousel';

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      {/*검색창 컴포넌트 : 검색어 입력시 검색페이지로 이동 */}
      <SearchInput />
      {/*TopicCarousel 컴포넌트 : 토픽별 캐러셀 */}
      <TopicCarousel />
    </div>
  );
};

export default Home;
