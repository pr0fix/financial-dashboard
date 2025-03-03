import { Metadata } from "next";
import { fetchCustomersWithInvoices } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page() {
  const customers = await fetchCustomersWithInvoices();

  if (!customers) {
    notFound();
  }

  return (
    <main>
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </main>
  );
}
