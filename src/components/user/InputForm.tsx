import { Control, Controller } from "react-hook-form";

type InputProps = {
	control: Control<any>; // React Hook Form의 control 객체
	name: string;
	placeholder: string;
	errors: any; // React Hook Form에서 필드의 유효성 검사 에러
	className?: string;
	type?: string;
};

const Input = ({ control, name, placeholder, errors, className, type }: InputProps) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<div>
					<input {...field} type={type} placeholder={placeholder} className={className} />
					{errors?.[name] && <p className="text-red-500">{errors[name]?.message}</p>}
				</div>
			)}
		/>
	);
};

export default Input;
