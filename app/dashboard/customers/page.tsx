import { Metadata } from "next";
import CustomersTable from "@/app/ui/customers/table";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  if (!props) {
    notFound();
  }

  return (
    <main>
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <CustomersTable query={query} onNotFound={notFound} />
      </Suspense>
    </main>
  );
}
