'use client'
import styles from "./styles.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    return (
    <nav className={styles.navbar}>
        <ul>
            <li><Link className={ pathname == "/"  ? styles.active : styles.inactive} href="/">Home</Link></li>
            <li><Link className={ pathname == "/collection"  ? styles.active : styles.inactive} href="/collection">Dashboard</Link></li>
            <li><Link className={ pathname == "/admin"  ? styles.active : styles.inactive} href="/admin">All Services</Link></li>
        </ul>
    </nav>);
}