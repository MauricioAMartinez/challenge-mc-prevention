import Styles from "./select.module.css";

interface SelectProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; label: string }[];
  register: any;
  error?: string;
}

export default function Select({ label, id, options, register, error, ...rest }: SelectProps) {
  return (
    <div className={Styles.selectWrapper}>
      <label style={{ display: 'none' }} htmlFor={id}>{label}</label>
      <select className={Styles.select} id={id} {...register} {...rest}>
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className={Styles.errorMessage}>{error}</p>}
    </div>
  );
}
