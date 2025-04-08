import styles from "./styles.module.css"
import Image from "next/image"

export default function Subnav() {
    return (<div className={styles.subnav}>
        <div className={styles.logo}>IT Ticket admin center</div>
        <div className={styles.profile}>
            <div className={styles.name}>Harry Pham</div>
            <div className={styles.img}>
                <Image src="/login.png" width={40} height={40} alt="Login Icon"/>
            </div>
        </div>
    </div>)
}