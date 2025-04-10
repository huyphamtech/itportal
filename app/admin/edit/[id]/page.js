'use client'
import styles from "./styles.module.css";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { editTicket } from "@/app/admin/action";

export default function Collection({ params }) {
    //get current data from api
    const [ticket, setTicket] = useState({
        id: "",
        short_description: "",
        full_description: "",
        solve_status: "",
        task_type:"",
        date: ""
    });
    let message = "";
    useEffect(() => {
        const fetchapi = async () => {
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
            setTicket(await data.json());
        }
        fetchapi()
    })


    //onChange
    function handleChange (e) {
        const {name, value} = e.target;
        setTicket((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className={styles.page}>
            {message && <div className={styles.message}>{message}</div>}
            {!message && <div className={styles.ticketItem}>
                <form action={editTicket}>
                    <div className={styles.first_line}><div className={styles.id}>{ticket.id}</div> <div className={styles.link_box}><Link href={`/admin/`}>Back to Admin Center</Link></div></div>
                    <div className={styles.second_line}>
                        <label htmlFor="short_description">
                            <strong>Short Description:</strong>
                        </label>
                        <input type="text" name="short_description" id="short_description" value={ticket.short_description} className={styles.text} onChange={handleChange} />
                    </div>
                    <div className={styles.third_line}>
                        <div><strong>Status:</strong> {ticket.solve_status}</div>
                        <div><strong>Task Catalog:</strong> {ticket.task_type}</div>
                        <div><strong>Date:</strong> {ticket.date}</div>
                    </div>
                    <div className={styles.last_line}>
                        <strong>Full Description:</strong><br />
                        <div className={styles.full}>{ticket.full_description}</div>
                    </div>
                </form>
            </div>}
        </div>
    );
}
