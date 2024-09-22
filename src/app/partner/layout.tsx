import DashboardLayout from "@/src/components/dashboard/Layout";
import PartnerRouter from "@/src/routes/PartnerRouter";

import '@/styles/theme.scss';
export default function ManagerLayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <DashboardLayout menu={PartnerRouter}>
                {children}
            </DashboardLayout>
        </>
    );
}