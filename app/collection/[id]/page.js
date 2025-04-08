import styles from "./styles.module.css";
import Link from "next/link";

export default async function Collection({ params }) {
  const {id} = await params;
  const {data, message} = getATicket(id);
  const ticket = await data.json();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>IT Tickets Dashboard</h1>
      {message && <div className={styles.message}>{message}</div>}
      {!message && <div classname={styles.ticketItem}>
        <p><strong>ID:</strong> {ticket.id}</p>
        <p><strong>Short Description:</strong> {ticket.short_description}</p>
        <p><strong>Status:</strong> {ticket.solve_status}</p>
        <p><strong>Task Catalog:</strong> {ticket.task_type}</p>
        <p><strong>Date:</strong> {ticket.date}</p>
        <strong>Full Description:</strong><br /> <div className={styles.full}>{ticket.full_description}</div>
      </div>}
    </div>
  );
}
