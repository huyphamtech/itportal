'use client'
import styles from "./styles.module.css";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { editTicket } from "@/app/admin/action";
import { useParams } from 'next/navigation'

export default function Collection() {
    const [message_list, setMessage_List] = useState([]);
    const params = useParams();

    //get current data from api
    const [ticket, setTicket] = useState({
        id: "",
        short_description: "",
        full_description: "",
        solve_status: "",
        task_type: "",
        date: ""
    });
    let message = "";
    useEffect(() => {
        const fetchapi = async () => {
            if (!params.id) return;
            const data = await fetch(`http://localhost:4000/tickets/${params.id}`);
            if (!data.ok) {
                message = `Failed to load ticket #ID: ${params.id}`;
                return (
                    <div className={styles.page}>
                        {message && <div className={styles.message}>{message}</div>}
                    </div>
                );
            }
            setTicket(await data.json());
        }
        fetchapi()
    }, [params.id])

    //OnChange + Form Validation
    function handleChange(e) {
        const { name, value } = e.target;
        setTicket((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    function onSubmit(e) {
        let errors = 0;
        setMessage_List([]);
        e.preventDefault();
        //validate short description
        
        if (!ticket.short_description.trim()) {
            setMessage_List((prev) => ([...prev, " Short Description must not be empty."]));
            errors++;
        }
        if (ticket.short_description.length < 3 || ticket.short_description.length >= 50) {
            setMessage_List((prev) => ([...prev, "Short Description must be between 3 and 50 characters."]));
            errors++;
        }
        if (!/^[a-zA-Z0-9\s]+$/.test(ticket.short_description)) {
            setMessage_List((prev) => ([...prev, "Short description cannot contain special characters."]));
            errors++;
        }

        //validate status
        if (!ticket.solve_status) {
            setMessage_List((prev) => ([...prev, "Status Must Be Selected."]));
            errors++;
        }

        //validate task catalog
        if (!ticket.task_type) {
            setMessage_List((prev) => ([...prev, "You Must Select The Task Catalog."]));
            errors++;
        }

        //validate task catalog
        if (!ticket.date) {
            setMessage_List((prev) => ([...prev, "You Must Select The Date."]));
            errors++;
        }

        //validate full description
        if (!ticket.full_description.trim()) {
            setMessage_List((prev) => ([...prev, "Full Description must not be empty."]));
            errors++;
        }
        if (ticket.full_description.length < 100 || ticket.full_description.length >= 1000) {
            setMessage_List((prev) => ([...prev, "Full Description must be between 100 and 1000 characters."]));
            errors++;
        }

        if (errors == 0) {
            editTicket(ticket);
        }
    }

    return (
        <div className={styles.page}>
            {message && <div className={styles.message}>{message}</div>}
            {!message && <div className={styles.ticketItem}>
                <form onSubmit={onSubmit}>
                    <div className={styles.first_line}>
                        <div className={styles.id}>{ticket.id}</div>
                        <input type="hidden" name="id" value={ticket.id}></input>
                        <div className={styles.link_box}>
                            <Link href={`/admin/`}>Back to Admin Center</Link>
                        </div>
                    </div>
                    <div className={styles.second_line}>
                        <label htmlFor="short_description">
                            <strong>Short Description:</strong>
                        </label>
                        <input type="text" name="short_description" id="short_description" value={ticket.short_description} className={styles.text} onChange={handleChange} />
                    </div>
                    <div className={styles.third_line}>
                        <div>
                            <label className={styles.label}><strong>Status</strong></label>
                            <div className={styles.radio_group}>
                                <label><input type="radio" name="solve_status" value="complete" onChange={handleChange} />Complete</label>
                                <label><input type="radio" name="solve_status" value="incomplete" onChange={handleChange} />Incomplete</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="task_type" className={styles.label}><strong>Task Catalog</strong></label>
                            <select id="task_type" name="task_type" className={styles.select} onChange={handleChange}>
                                <option value="">-- Select --</option>
                                <option value="hardware">Hardware</option>
                                <option value="network">Network</option>
                                <option value="account">Account</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date" className={styles.label}><strong>Date:</strong></label>&nbsp;
                            <input type="date" name="date" id="date" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className={styles.last_line}>
                        <label htmlFor="full_description" className={styles.label}>Full Description:</label>&nbsp;
                        <textarea name="full_description" id="full_description" onChange={handleChange} value={ticket.full_description}/>
                    </div>
                    <div><input type="submit" value="Make a change" className={styles.btn} /></div>
                </form>
                <ul className={styles.message_list}>
                    {message_list.map((item, id) => (<li key={id}>{item}</li>))}
                </ul>
            </div>}
        </div>
    );
}
