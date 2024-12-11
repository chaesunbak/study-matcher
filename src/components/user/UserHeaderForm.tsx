import { FaRegUser } from 'react-icons/fa';

const UserHeaderForm = () => {
  const toggleUserMenu = () => {};

  return (
    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 shadow-md">
      <FaRegUser onClick={toggleUserMenu} />
    </div>
  );
};

export default UserHeaderForm;
