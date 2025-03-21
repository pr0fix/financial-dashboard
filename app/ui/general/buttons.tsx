"use client";

import { deleteInvoice, deleteCustomer } from "@/app/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import ConfirmDialog from "../customers/confirm-dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const handleConfirmDelete = async () => {
    await deleteInvoice(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-md border p-2 hover:bg-red-500 hover:text-white">
        <TrashIcon className="w-5" />
      </AlertDialogTrigger>

      <ConfirmDialog
        onConfirm={handleConfirmDelete}
        message="This action cannot be undone. This invoice will be permanently deleted from our servers."
      />
    </AlertDialog>
  );
}

export function CreateCustomer() {
  return (
    <Link
      href="/dashboard/customers/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Customer</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCustomer({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/customers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
      data-testid="update-button"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCustomer({ id }: { id: string }) {
  const handleConfirmDelete = async () => {
    await deleteCustomer(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-md border p-2 hover:bg-red-500 hover:text-white">
        <TrashIcon className="w-5" />
      </AlertDialogTrigger>

      <ConfirmDialog
        onConfirm={handleConfirmDelete}
        message="This action cannot be undone. This will permanently delete this
          customer from our servers."
      />
    </AlertDialog>
  );
}
