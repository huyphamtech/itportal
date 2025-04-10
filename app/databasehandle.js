export default async function getTickets() {
    const data = await fetch("http://localhost:4000/tickets");
    const message = "";
    if (!data.ok) {
        message = "Failed to load tickets";
        return {ticket: null, message};
    }
    const tickets = await data.json();
    return {tickets, message};
}