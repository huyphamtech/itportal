import styles from "./page.module.css";
import "@/app/global.css";
import Link from "next/link";
import getTickets from "@/app/databasehandle";
import { deleteTicket } from "./action";

export default async function Home() {
  const { tickets, message } = await getTickets();

  return (
    <div className={styles.page}>
      {message && <div className={styles.message}>{message}</div>}
      {!message && <div>
        <div className={styles.banner}>
          <div className={styles.banner_text}>
            <strong>Admin Center</strong>
            <p>Create, edit, and delete tickets in one click.</p>
          </div>
        </div>
        <div className={styles.link}>
          <Link href="/admin/create">Create New Ticket</Link>
        </div>
        <div className={styles.ticket_table_box}>
          <table className={styles.ticket_table}>
            <thead className={styles.thead}>
              <tr><th>ID</th><th>Short Description</th><th>Solve Status</th><th>Task Type</th><th>Date</th><th>Edit</th><th>Delete</th></tr>
            </thead>
            <tbody className={styles.tbody}>
              {
                tickets.map(ticket => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.short_description}</td>
                    <td>{ticket.solve_status}</td>
                    <td>{ticket.task_type}</td>
                    <td>{ticket.date}</td>
                    <td><Link href={`/admin/edit/${ticket.id}`} className={`${styles.btn_edit} ${styles.btn}`}>Edit</Link></td>
                    <td>
                      <form action={deleteTicket.bind(null, ticket.id)}>
                        <input type="submit" value="Delete" className={`${styles.btn} ${styles.btn_delete}`} />
                      </form>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>}
    </div>
  );
}
