import { Users, DollarSign, Clock, Inbox, Share2, Briefcase, ShoppingBag, Package } from 'react-feather';

import { inter, lusitana } from '@/src/fonts/fonts';
import clsx from 'clsx';
import { cookies } from 'next/headers';
import partnerDashboardApiRequest from '@/src/apiRequests/dashboard/partner';
import { PartnerDashboardCardResType } from '@/src/schemaValidations/common.schema';
//   import { fetchCardData } from '@/app/lib/data';

const iconMap = {
    customers: Users,
    collected: DollarSign,
    pending: Clock,
    invoices: Inbox,
    partner: Share2,
    kcenter: Briefcase,
    order: ShoppingBag,
    usingPackage: Package,
};
type Cardata = PartnerDashboardCardResType['data'] | undefined;

export default async function CardWrapper() {

    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;

    const cardData: Cardata = await fletchCardData();
    async function fletchCardData() {
        if (sessionToken !== undefined) {
            try {
                const response = await partnerDashboardApiRequest.getDashboardCardData(sessionToken);
                return response.payload.data;
            } catch (error) {
                console.log(error);
            }
        }

        return undefined;

    }
    return (
        <>
            {/* NOTE: comment in this code when you get to this point in the course */}
            <Card title="Số trung tâm" value={cardData?.careCenters ?? 0} type="kcenter" />
            <Card title="Người dùng" value={cardData?.customers ?? 0} type="customers" />
            <Card title="Giao dịch" value={cardData?.orders ?? 0} type="order" />
            <Card title="Gói được dùng" value={cardData?.usingPackages ?? 0} type="usingPackage" />

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
    type: 'customers' | 'kcenter' | 'order' | 'usingPackage';
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
                <div className={` m-0 rounded-3 bg-white px-3 text-xl-2 ${inter.className}`}>
                    <h1 className="text-truncate fw-bold">{value}</h1>
                    {/* <p className='m-0'>sub data</p> */}
                </div>
            </div>
        </div>
    );
}
