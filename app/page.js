import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div className={styles.banner_text}>Manage incidents with IT Portal</div>
        <div className={styles.banner_img}><Image width={512} height={512} alt="IT Support" src="/banner_img.png" /></div>
        </div>
    </div>
  );
}
