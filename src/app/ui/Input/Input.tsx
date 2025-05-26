import Styles from "./input.module.css";
interface InputProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  register: any;
  error?: string;
}

export default function Input({ label, id, register, error, ...rest }: InputProps) {
  return (
    <div className={Styles.inputWrapper}>
      <label style={{ display: 'none' }} htmlFor={id}>{label}</label>
      <input className={Styles.input} id={id} {...register} {...rest} />
      {error && <p className={Styles.errorMessage}>{error}</p>}
    </div>
  );
}
