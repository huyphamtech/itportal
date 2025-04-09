import styles from "./page.module.css";
import "@/app/global.css";
import Link from "next/link";

export default async function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.message}>Please go back to the Admin Center and select a ticket!!!</div>
      <div className={styles.link}><Link href="/admin" alt="back button" className={styles.link}>Back to Admin Center</Link></div>
    </div>
  );
}
