import SearchInput from '../components/SearchInput';

import GroupSearchFilter from '../components/search/GroupSearchFilter';
import useMeetings from '../hooks/useMeetings';
import GroupSummary from '../components/GroupSummary';

const Search = () => {
  const { meetings } = useMeetings();

  return (
    <div className="flex flex-col gap-4">
      <SearchInput />
      <GroupSearchFilter />
      <div className="flex flex-col gap-3 md:gap-5">
        {meetings.map((meeting) => (
          <GroupSummary key={meeting.id} meeting={meeting} />
        ))}
        // TODO :현재는 1페이지만 보여주고 있습니다 후에 페이지네이션을 구현하거나 무한스크롤을
        추가할 예정입니다
        {/* <button>더보기</button> */}
      </div>
    </div>
  );
};

export default Search;
