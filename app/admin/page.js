import Image from "next/image";
import styles from "./page.module.css";
import getTickets from "@/app/databasehandle";

export default async function Home() {
  let total = 0;
  let completed = 0;
  let unsolved = 0;
  const {tickets, message} = await getTickets();
  if (!message) {
    total = tickets.length;
  }
  
  tickets.forEach( (item) => {
    if (item.solve_status == "Completed") completed ++;
    if (item.solve_status == "Unsolved") unsolved ++;
  });

  return (
    <div className={styles.page}>
      {message && <div className={styles.message}>{message}</div>}
      {!message && <div>
        <div className={styles.banner}>
          <div className={styles.banner_text}>
            <strong>Manage incidents with IT Portal</strong>
            <p>Maximize productivity and simplify administration without compromising endpoint management and security.</p>
          </div>
          <div className={styles.banner_img}><Image width={256} height={256} alt="IT Support" src="/banner_img.png" /></div>
        </div>
        <div className={styles.banner_status}>
          <strong>Status</strong>
          <div className={styles.summary}>
            <div className={styles.total}>Total: {total}</div>
            <div className={styles.completed}>Completed: {completed}</div>
            <div className={styles.unsolved}>Unsolved: {unsolved}</div>
          </div>
        </div>
      </div>}
    </div>
  );
}
