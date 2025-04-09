'use server'

import { revalidatePath } from 'next/cache';

export async function deleteTicket(deleteID) {
    await fetch(`http://localhost:4000/tickets/${deleteID}`, {
        method: "DELETE"
    });
    revalidatePath(`/collection/${deleteID}`);
    revalidatePath("/collection/");
    revalidatePath("/admin");
};

export async function createTicket(formData) {

    const rawFormData = {
        ticketid: formData.get('ticketid'),
        short_description: formData.get('short_description'),
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
            solve_status: rawFormData.solve_status,
            task_type: rawFormData.task_type,
            date: rawFormData.date
        }),
    });

    revalidatePath('/collection');
    revalidatePath('/admin');
}