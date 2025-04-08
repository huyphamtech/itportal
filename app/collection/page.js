import styles from "./styles.module.css";
import Link from "next/link";
import getTickets from "@/app/databasehandle";

export default async function Collection() {
  const {id} = await params;
  const {data, message} = getATicket(id);
  const tickets = await data.json();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>IT Tickets Dashboard</h1>
      {message && <div className={styles.message}>{message}</div>}
      {!message && <ul className={styles.ticketList}>
        {tickets.map((item) => (
          <li key={item.id} className={styles.ticketItem}>
            <div className={styles.link_box}>
              <p><strong>ID:</strong> {item.id}</p>
              <Link href={`/collection/${item.id}`}>More</Link>
            </div>
            <p><strong>Short Description:</strong> {item.short_description}</p>
            <p><strong>Status:</strong> {item.solve_status}</p>
            <p><strong>Task Catalog:</strong> {item.task_type}</p>
            <p><strong>Date:</strong> {item.date}</p>
            <strong>Full Description:</strong><br /> <div className={styles.full}>{item.full_description}</div>
          </li>
        ))}
      </ul>}
    </div>
  );
}
