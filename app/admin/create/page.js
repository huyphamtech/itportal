import { createTicket } from "@/app/admin/action";
import styles from "./page.module.css";

export default function TaskForm() {
    return (
        <div className={styles.form_box}>
          <form action={createTicket}>

            <div className={styles.form_group}>
              <label htmlFor="short_description" className={styles.label}>Short Description:</label>&nbsp;
              <input type="text" name="short_description" id="short_description" required />
            </div>

            <div className={styles.form_group}>
              <label className={styles.label}>Status</label>
              <div className={styles.radio_group}>
                <label><input type="radio" name="solve_status" value="complete" required />Complete</label>
                <label><input type="radio" name="solve_status" value="incomplete" /> Incomplete</label>
              </div>
            </div>

            <div className={styles.form_group}>
              <label htmlFor="task_type" className={styles.label}>Task Catalog</label>
              <select id="task_type" name="task_type" className={styles.select} required>
                <option value="">-- Select --</option>
                <option value="hardware">Hardware</option>
                <option value="network">Network</option>
                <option value="account">Account</option>
              </select>
            </div>

            <div className={styles.form_group}>
              <label htmlFor="date" className={styles.label}>Date:</label>&nbsp;
              <input type="date" name="date" id="date" required />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="full_description" className={styles.label}>Full Description:</label>&nbsp;
              <textarea name="full_description" id="full_description" required />
            </div>

            <input type="submit" value="Create an IT ticket" className={styles.btn}/>
          </form>
        </div>
    )
}