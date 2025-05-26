import styles from "./button.module.css";

interface ButtonProps {
  type?: "button" | "submit";
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function Button({
  type = "submit",
  children,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  return (
    <button type={type} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
