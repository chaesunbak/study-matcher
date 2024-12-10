import { Controller } from "react-hook-form";

const Input = ({ control, name, placeholder, errors, className, type }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<div>
					<input {...field} type={type} placeholder={placeholder} className={className} />
					{errors[name] && <p className="text-red-500">{errors[name].message}</p>}
				</div>
			)}
		/>
	);
};

export default Input;
