import DashboardLayout from '@/src/components/manager/Layout';
import '@/styles/theme.scss';
export default function ManagerLayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </>
    );
}