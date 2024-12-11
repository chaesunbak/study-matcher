import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSearch } from 'react-icons/lu';
import { cn } from '../utils/utils';

interface SearchInputProps {
  className?: string;
}

const SearchInput = ({ className }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current) {
      const keyword = inputRef.current.value;
      navigate(`/search?keyword=${keyword}`);
      return;
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
    <div className={cn('flex items-center rounded-3xl border px-4 py-2', className)}>
      <LuSearch className="mr-2" aria-hidden="true" />
      <input
        type="text"
        placeholder="키워드로 모임 검색"
        className="flex-grow outline-none"
        ref={inputRef}
        onKeyPress={handleKeyPress}
        aria-label="검색어 입력"
      />
    </div>
  );
};

export default SearchInput;
