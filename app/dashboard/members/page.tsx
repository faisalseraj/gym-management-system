import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { CreateMember } from '@/app/ui/Members/buttons';
import CustomersTable from '@/app/ui/Members/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Members</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search member..." />
        <CreateMember />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
      
    </div>
  );
}