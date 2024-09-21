import { Users, DollarSign, Clock, Inbox, Share2, Briefcase } from 'react-feather';

import { inter, lusitana } from '@/src/fonts/fonts';
import clsx from 'clsx';
//   import { fetchCardData } from '@/app/lib/data';

const iconMap = {
    customers: Users,
    collected: DollarSign,
    pending: Clock,
    invoices: Inbox,
    partner: Share2,
    kcenter: Briefcase
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
            <Card title="Người dùng" value={numberOfCustomers} type="customers" />
            <Card title="Đối tác" value={totalPaidInvoices} type="partner" />
            <Card title="Trung tâm" value={totalPendingInvoices} type="kcenter" />
            <Card title="Giao dịch" value={numberOfInvoices} type="invoices" />

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
    type: 'invoices' | 'customers' | 'pending' | 'collected' | 'partner' | 'kcenter';
}) {
    const Icon = iconMap[type];

    return (
        <div className="col">
            <div className="rounded-3 bg-white p-2 shadow-sm">
                <div className="d-flex p-2 align-items-center justify-content-between">
                    <h3 className={clsx("ms-2 my-0 fw-normal text-md font-black fw-bold", inter.className)}>{title}</h3>
                    {Icon && (
                        <div className='icon-shape icon-md bg-light-primary text-primary rounded-2'>
                            <Icon size={20} />
                        </div>
                    )}
                </div>
                <p className={` m-0 rounded-3 bg-white px-3 text-xl-2 ${inter.className}`}>
                    <h1 className="text-truncate fw-bold">{value}</h1>
                    <p className='m-0'>sub data</p>
                </p>
            </div>
        </div>
    );
}
