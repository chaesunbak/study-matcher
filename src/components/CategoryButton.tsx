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
        'rounded-full px-2 py-1 text-sm',
        isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
      )}
    >
      {category}
    </button>
  );
};

export default CategoryButton;
