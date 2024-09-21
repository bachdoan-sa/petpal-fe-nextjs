import Form from '@/src/components/admin/table/users/create-form';
import Breadcrumbs from '@/src/components/admin/breadcrumbs';

 
export default async function Page() {
 
  return (
    <main className='container'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/admin/users' },
          {
            label: 'Create user',
            href: '/admin/users/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}