import styles from "./styles.module.css";

async function getTickets() {
  const data = await fetch("http://localhost:4000/tickets");
  const tickets = await data.json();

  if (!data.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return tickets;
}

export default async function Collection() {
  let data;
  try {
    data = await getTickets();
  } catch (error) {
    return <div className={styles.message}>Failed to load tickets.</div>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>IT Tickets Dashboard</h1>
      <ul className={styles.ticketList}>
        {data.map((item) => (
          <li key={item.id} className={styles.ticketItem}>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Short Description:</strong> {item.short_description}</p>
            <p><strong>Status:</strong> {item.solve_status}</p>
            <p><strong>Task Catalog:</strong> {item.task_type}</p>
            <p><strong>Date:</strong> {item.date}</p>
            <strong>Full Description:</strong><br /> <div className={styles.full}>{item.full_description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
