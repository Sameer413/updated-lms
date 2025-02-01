import { styles } from "@/app/styles/styles";

interface InputFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
}

const FormInputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  className,
  inputClassName,
}) => (
  <div className={className}>
    <label className={`${styles.label}`}>{label}</label>
    {type === "textarea" ? (
      <textarea
        className={`${styles.input} h-min py-2`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={3}
      />
    ) : (
      <input
        type={type}
        className={`${styles.input} ${inputClassName}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
);

export default FormInputField;
