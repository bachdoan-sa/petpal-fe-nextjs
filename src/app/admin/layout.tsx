import '../../../styles/theme.scss';
import Layout from "@/src/components/admin/Layout.jsx";
export default function AdminLayout({ children }: { children: React.ReactNode; }) {
    return (
        <Layout>
            {children}
        </Layout>
    );
}