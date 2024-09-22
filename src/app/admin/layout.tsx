import '../../../styles/theme.scss';
import Layout from "@/src/components/dashboard/Layout";
import AdminRouter from '@/src/routes/AdminRoutes';
export default function AdminLayout({ children }: { children: React.ReactNode; }) {
    return (
        <Layout menu={AdminRouter}>
            {children}
        </Layout>
    );
}