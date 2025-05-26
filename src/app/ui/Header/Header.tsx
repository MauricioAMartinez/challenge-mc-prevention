import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.container}>
            <span className={styles.logo}>M</span>
            <span className={styles.logo}>C</span>
        </header>
    )
}