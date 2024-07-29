import Form from '@/src/components/admin/form/create';
import Breadcrumbs from '@/src/components/breadcrumb/Breadcrumb';

 
export default async function Page() {
 
  return (
    <main>
      {/* <Breadcrumbs pageName= 'User' pageTitle= '/dashboard/invoices' /> */}
      <Form />
    </main>
  );
}