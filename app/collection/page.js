import styles from "./styles.module.css";
import Link from "next/link";
import getTickets from "@/app/databasehandle";

export default async function Collection() {
  const {tickets, message} = await getTickets();
  
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>IT Tickets Dashboard</h1>
      {message && <div className={styles.message}>{message}</div>}
      {!message && <ul className={styles.ticketList}>
        {tickets.map((item) => (
          <li key={item.id} className={styles.ticketItem}>
            <div className={styles.link_box}>
              <div className={styles.id}><strong>#ID:</strong><div className={styles.number}>{item.id}</div></div>
              <Link href={`/collection/${item.id}`}>More</Link>
            </div>
            <div className={styles.description}><strong>Short Description:</strong> {item.short_description}</div>
          </li>
        ))}
      </ul>}
    </div>
  );
}
