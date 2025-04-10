'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteTicket(deleteID) {
    await fetch(`http://localhost:4000/tickets/${deleteID}`, {
        method: "DELETE"
    });
    revalidatePath(`/collection/${deleteID}`);
    revalidatePath("/collection/");
    revalidatePath("/admin");
};

export async function createTicket(formData) {
    const data = await fetch("http://localhost:4000/tickets");
    const tickets = await data.json();
    let id = "1";
    if (tickets.length > 0) {
        id = Math.max(...tickets.map(item => item.id)) + 1;
    }

    const rawFormData = {
        ticketid: `${id}`,
        short_description: formData.get('short_description'),
        full_description: formData.get('full_description'),
        solve_status: formData.get('solve_status'),
        task_type: formData.get('task_type'),
        date: formData.get('date'),
    }

    await fetch('http://localhost:4000/tickets', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: rawFormData.ticketid,
            short_description: rawFormData.short_description,
            full_description: rawFormData.full_description,
            solve_status: rawFormData.solve_status,
            task_type: rawFormData.task_type,
            date: rawFormData.date
        }),
    });

    revalidatePath('/collection');
    revalidatePath(`/collection/${id}`);
    revalidatePath('/admin');

    redirect('/admin');
}

export async function editTicket(ticket) {

    await fetch(`http://localhost:4000/tickets/${ticket.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: ticket.id,
            short_description: ticket.short_description,
            full_description: ticket.full_description,
            solve_status: ticket.solve_status,
            task_type: ticket.task_type,
            date: ticket.date
        }),
    });
    revalidatePath('/collection');
    revalidatePath(`/collection/${ticket.id}`);
    revalidatePath('/admin');
    revalidatePath(`/admin/edit/${ticket.id}`);

    redirect('/admin');
}