export const formatDate = (date: Date | string, formatStr: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Invalid Date";

    const pad = (n: number) => n.toString().padStart(2, '0');
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (formatStr === "MMMM dd, hh:mm a") {
        let hours = d.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${fullMonths[d.getMonth()]} ${pad(d.getDate())}, ${pad(hours)}:${pad(d.getMinutes())} ${ampm}`;
    }

    if (formatStr === "hh:mm a") {
        let hours = d.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${pad(hours)}:${pad(d.getMinutes())} ${ampm}`;
    }

    if (formatStr === "MMM dd, yyyy") {
        return `${months[d.getMonth()]} ${pad(d.getDate())}, ${d.getFullYear()}`;
    }

    if (formatStr === "dd MMM, hh:mm a") {
        let hours = d.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${pad(d.getDate())} ${months[d.getMonth()]}, ${pad(hours)}:${pad(d.getMinutes())} ${ampm}`;
    }

    return d.toLocaleDateString();
};
