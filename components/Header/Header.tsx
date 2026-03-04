import styles from './Header.module.css';


type HeaderProps = {
  title: string;
};


export default function Header({ title }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>


      <nav className={styles.nav}>
        <a href="#overview">Overview</a>
        <a href="#features">Features</a>
        <a href="#dev-status">Status</a>
        <a href="#cta">Join</a>
      </nav>
    </header>
  );
}