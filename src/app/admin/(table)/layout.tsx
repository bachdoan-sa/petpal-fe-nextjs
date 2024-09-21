export default function AdminTableLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="container-fluid px-6 py-4">
            {children}
        </div>
    );
}