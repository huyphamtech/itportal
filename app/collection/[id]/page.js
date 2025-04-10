import styles from "./styles.module.css";
import Link from "next/link";

export default async function Collection({ params }) {
  let message = "";
  const { id } = await params;
  const data = await fetch(`http://localhost:4000/tickets/${id}`);

  if (!data.ok) {
    message = `Failed to load ticket #ID: ${id}`;
    return (
      <div className={styles.page}>
        {message && <div className={styles.message}>{message}</div>}
      </div>
    );
  }
  const ticket = await data.json();

  return (
    <div className={styles.page}>
      {message && <div className={styles.message}>{message}</div>}
      {!message && <div className={styles.ticketItem}>
        <div className={styles.first_line}><div className={styles.id}>{ticket.id}</div> <div className={styles.link_box}><Link href={`/collection/`}>Back to Dashboard</Link></div></div>
        <div className={styles.second_line}><strong>Short Description:</strong> {ticket.short_description}</div>
        <div className={styles.third_line}>
          <div><strong>Status:</strong> {ticket.solve_status}</div>
          <div><strong>Task Catalog:</strong> {ticket.task_type}</div>
          <div><strong>Date:</strong> {ticket.date}</div>
        </div>
        <div className={styles.last_line}>
          <strong>Full Description:</strong><br />
          <div className={styles.full}>{ticket.full_description}</div>
        </div>
      </div>}
    </div>
  );
}

export async function generateStaticParams() {
  const data = await fetch('http://localhost:4000/tickets');
  const tickets = await data.json();
 
  return tickets.slice(0, 10).map(ticket => ({
    id: ticket.id.toString(),
}));
}