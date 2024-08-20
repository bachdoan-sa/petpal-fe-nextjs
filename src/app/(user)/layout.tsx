import Footer1 from "@/src/components/footer/Footer1";
import Header2 from "@/src/components/header/Header2";
import BootstrapMenu from "@/src/components/header/Menu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header2 />
      <div className="">
        <div className="row flex-nowrap" style={{ width: '100%' }}>
          <BootstrapMenu />
          <div className="col" style={{ height: '100%', overflowY: 'auto' }}>{children}</div>
        </div>
      </div>
      <Footer1 />
    </>
  );
}
