import clsx from 'clsx';

interface CategoryButtonProps {
  category: string;
  onClick: () => void;
  isActive?: boolean;
}

const CategoryButton = ({ category, onClick, isActive = false }: CategoryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-full border px-2 py-1 text-sm transition-all',
        isActive
          ? 'bg-primary border-primary font-medium text-white'
          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
      )}
    >
      {category}
    </button>
  );
};

export default CategoryButton;
