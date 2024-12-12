import SearchInput from '../components/SearchInput';
import { useSearchParams } from 'react-router';
import { dummyMeetings } from '../data';
import GroupSummary from '../components/GroupSummary';
import GroupSearchFilter from '../components/search/GroupSearchFilter';

const Search = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('keyword'));
  return (
    <div className="flex flex-col gap-4">
      <SearchInput />
      <GroupSearchFilter />
      <div className="flex flex-col gap-3 md:gap-5">
        {dummyMeetings.map((meeting) => (
          <GroupSummary key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};

export default Search;
