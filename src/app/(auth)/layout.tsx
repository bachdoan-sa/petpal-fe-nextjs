import Footer1 from "@/src/components/footer/Footer1";
import Header2 from "@/src/components/header/Header2";
import { Toaster } from "sonner";

export default function AuthLayout({ children }: { children: React.ReactNode; }) {
    return ( <>
        <Header2 />
        {children}
        <Footer1 />
    </>);
}
