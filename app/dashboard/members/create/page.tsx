import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/Members/create-form';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Members', href: '/dashboard/members' },
          {
            label: 'Add New Member',
            href: '/dashboard/members/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}