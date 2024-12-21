import { useRef, useEffect } from 'react';
import { LuSearch } from 'react-icons/lu';
import { cn } from '../utils/utils';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

interface SearchInputProps {
  className?: string;
}

const SearchInput = ({ className }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current) {
      const keyword = inputRef.current.value;

      // 검색어가 없으면 검색하지 않음 검색을 막아서 실수로 검색되는 것을 방지
      // 하지만 이미 검색을 한다음에 검색어를 초기화하고 싶으면 검색어를 지우고 엔터를 누르면 검색이 되지 않음
      if (keyword) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('keyword', keyword);

        if (location.pathname === '/') {
          navigate(`/search?${newSearchParams.toString()}`);
        } else {
          setSearchParams(newSearchParams);
        }
      }
    }
  };

  const handleSlashKey = (event: KeyboardEvent) => {
    if (event.key === '/') {
      event.preventDefault();
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSlashKey);
    return () => {
      window.removeEventListener('keydown', handleSlashKey);
    };
  }, []);

  return (
    <div
      className={cn(
        'flex items-center rounded-3xl border px-4 py-2 transition-all focus-within:border-primary',
        className
      )}
    >
      <LuSearch className="mr-2" aria-hidden="true" />
      <input
        type="text"
        placeholder="키워드로 모임 검색"
        className="flex-grow bg-white outline-none dark:bg-black"
        ref={inputRef}
        onKeyPress={handleKeyPress}
        aria-label="검색어 입력"
      />
    </div>
  );
};

export default SearchInput;
