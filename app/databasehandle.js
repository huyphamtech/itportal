export default async function getTickets() {
    const data = await fetch("http://localhost:4000/tickets");
    const message = "";
    if (!data.ok) {
        message = "Failed to fetch tickets";
    }
    const tickets = await data.json();
    return tickets, message;
}

export async function getATicket(id) {
    const data = await fetch(`http://localhost:4000/tickets/${id}`);
    const message = "";
    if (!data.ok) {
        message = `Failed to fetch ticket: ${id}`;
    }
    const ticket = await data.json();
    return ticket, message;
}