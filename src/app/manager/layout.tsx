import DashboardLayout from '@/src/components/dashboard/Layout';
import ManagerRouter from '@/src/routes/ManagerRoutes';
import '@/styles/theme.scss';
export default function ManagerLayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <DashboardLayout menu={ManagerRouter}>
                {children}
            </DashboardLayout>
        </>
    );
}