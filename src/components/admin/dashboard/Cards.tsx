import { Users, DollarSign, Clock, Inbox } from 'react-feather';

import { lusitana } from '@/src/fonts/fonts';
//   import { fetchCardData } from '@/app/lib/data';

const iconMap = {
    collected: DollarSign,
    customers: Users,
    pending: Clock,
    invoices: Inbox,
};

export default async function CardWrapper() {
    // const {
    //   numberOfInvoices,
    //   numberOfCustomers,
    //   totalPaidInvoices,
    //   totalPendingInvoices,
    // } = await fetchCardData();

    const numberOfInvoices = 0
    const numberOfCustomers = 0
    const totalPaidInvoices = 0
    const totalPendingInvoices = 0

    return (
        <>
            {/* NOTE: comment in this code when you get to this point in the course */}

            <Card title="Collected" value={totalPaidInvoices} type="collected" />
            <Card title="Pending" value={totalPendingInvoices} type="pending" />
            <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
            <Card
                title="Total Customers"
                value={numberOfCustomers}
                type="customers"
            />
        </>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
    const Icon = iconMap[type];

    return (
        <div className="col">
            <div className="rounded-3 bg-light p-2 shadow-sm">
                <div className="d-flex p-4 align-content-center">
                    {Icon && <Icon size={20} />}
                    <h3 className="ms-2 my-0 fw-normal " style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}>{title}</h3>
                </div>
                <p className={`text-center rounded-3 bg-white px-3 py-5 text-xl-2 ${lusitana.className}`}>
                    <span className="text-truncate">{value}</span>
                </p>
            </div>
        </div>
    );
}
