import { Control, Controller } from 'react-hook-form';

type InputProps = {
  control: Control<any>; // React Hook Form의 control 객체
  name: string;
  placeholder: string;
  errors: any; // React Hook Form에서 필드의 유효성 검사 에러
  type?: string;
};

const Input = ({ control, name, placeholder, errors, type }: InputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className="focus:ring-indigo-500 w-full rounded-lg border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2"
          />
          {errors?.[name] && <p className="text-red-500">{errors[name]?.message}</p>}
        </div>
      )}
    />
  );
};

export default Input;
