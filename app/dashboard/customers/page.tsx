import { Metadata } from "next";
import Table from "@/app/ui/customers/table";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CustomersTableSkeleton } from "@/app/ui/general/skeletons";
import { fetchCustomersPages } from "@/app/lib/data";
import Pagination from "@/app/ui/general/pagination";
import { lusitana } from "@/app/ui/general/fonts";
import { CreateCustomer } from "@/app/ui/general/buttons";
import Search from "@/app/ui/general/search";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomersPages(query);
  if (!props) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
          Customers
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomer />
      </div>
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <Table query={query} currentPage={currentPage} onNotFound={notFound} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
