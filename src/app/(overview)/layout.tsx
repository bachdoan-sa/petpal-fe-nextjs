import Footer1 from "@/src/components/footer/Footer1";
import Header2 from "@/src/components/header/Header2";

export default function AdminLayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <Header2 />
            {children}
            <Footer1 />
        </>
    );
}